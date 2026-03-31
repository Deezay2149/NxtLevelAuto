import re

# Read the file
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Patch 1: generateCashflowReport - Add booked-in invoice logic
# Find the section where filteredExpenses.forEach ends and add booked-in logic after
pattern1 = r"(    filteredExpenses\.forEach\(exp => \{\n        const amount = parseFloat\(exp\.amount\) \|\| 0;\n        totalOutflows \+= amount;\n        outflowsList\.push\(\{\n            description: exp\.description \|\| 'Expense',\n            category: exp\.category \|\| 'General',\n            date: exp\.date,\n            amount: amount\n        \}\);\n    \}\);)"

replacement1 = r"""    filteredExpenses.forEach(exp => {
        const amount = parseFloat(exp.amount) || 0;
        totalOutflows += amount;
        outflowsList.push({
            description: exp.description || 'Expense',
            category: exp.category || 'General',
            date: exp.date,
            amount: amount
        });
    });

    // Calculate outflows from PAID booked-in supplier invoices
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

    // Add paid booked-in supplier invoices to outflows
    paidBookInRecords.forEach(record => {
        const amount = parseFloat(record.totalValue) || 0;
        totalOutflows += amount;
        outflowsList.push({
            description: 'Booked-In: ' + (record.supplierName || 'Unknown Supplier'),
            category: 'Supplier Invoice',
            date: record.date,
            amount: amount
        });
    });"""

content = re.sub(pattern1, replacement1, content)

# Patch 2: generateProfitLossReport - Add booked-in invoice logic
# Find the section where filteredExpenses.forEach ends and add booked-in logic after
pattern2 = r"(    filteredExpenses\.forEach\(exp => \{\n        const amount = parseFloat\(exp\.amount\) \|\| 0;\n        totalExpenses \+= amount;\n\n        const category = exp\.category \|\| 'Other';\n        if \(!expenseCategories\[category\]\) \{\n            expenseCategories\[category\] = 0;\n        \}\n        expenseCategories\[category\] \+= amount;\n    \}\);)"

replacement2 = r"""    filteredExpenses.forEach(exp => {
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

content = re.sub(pattern2, replacement2, content)

# Write back
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Patched both generateCashflowReport() and generateProfitLossReport() in app.js")