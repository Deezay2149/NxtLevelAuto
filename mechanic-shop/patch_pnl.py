import re

# Read the file
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Patch generateProfitLossReport - Add booked-in invoice logic
# Find the line number and insert after line 3392 (after the forEach closes)
lines = content.split('\n')
insert_after = 3392  # Line number (0-indexed would be 3391)

# Find the exact pattern to replace
pattern = r"(    filteredExpenses\.forEach\(exp => \{\n        const amount = parseFloat\(exp\.amount\) \|\| 0;\n        totalExpenses \+= amount;\n        \n        const category = exp\.category \|\| 'Other';\n        if \(!expenseCategories\[category\]\) \{\n            expenseCategories\[category\] = 0;\n        \}\n        expenseCategories\[category\] \+= amount;\n    \}\);)"

replacement = r"""    filteredExpenses.forEach(exp => {
        const amount = parseFloat(exp.amount) || 0;
        totalExpenses += amount;
        
        const category = exp.category || 'Other';
        if (!expenseCategories[category]) {
            expenseCategories[category] = 0;
        }
        expenseCategories[category] += amount;
    });

    // Add PAID booked-in supplier invoices to expenses
    const bookInRecords = JSON.parse(localStorage.getItem('bookInRecords') || '[]');
    const paidBookInRecords = bookInRecords.filter(record => {
        if (!record.date) return false;
        // Parse date string (YYYY-MM-DD format)
        const recordDateParts = record.date.split('T')[0].split('-');
        const recordDate = new Date(parseInt(recordDateParts[0]), parseInt(recordDateParts[1]) - 1, parseInt(recordDateParts[2]));
        const recordDateTime = recordDate.getTime();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        // Only include if paid and within date range
        return (record.paymentStatus === 'paid' || record.paymentStatus === 'Paid') && 
               recordDateTime >= startTime && recordDateTime <= endTime;
    });

    // Add paid booked-in supplier invoices to expense categories
    paidBookInRecords.forEach(record => {
        const amount = parseFloat(record.totalValue) || 0;
        totalExpenses += amount;

        const category = 'Supplier Invoice';
        if (!expenseCategories[category]) {
            expenseCategories[category] = 0;
        }
        expenseCategories[category] += amount;
    });"""

content = re.sub(pattern, replacement, content)

# Write back
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Patched generateProfitLossReport() in app.js")