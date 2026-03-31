import re

# Read the file
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Simpler pattern for cashflow - find the section after expenses filtering
pattern1 = r"(    let totalOutflows = 0;\n    let outflowsList = \[\];\n\n    filteredExpenses\.forEach\(exp => \{\n        const amount = parseFloat\(exp\.amount\) \|\| 0;\n        totalOutflows \+= amount;\n        outflowsList\.push\(\{\n            description: exp\.description \|\| 'Expense',\n            category: exp\.category \|\| 'General',\n            date: exp\.date,\n            amount: amount\n        \}\);\n    \}\);)"

replacement1 = r"""    // Calculate outflows from PAID booked-in supplier invoices
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

    let totalOutflows = 0;
    let outflowsList = [];

    // Add regular expenses
    filteredExpenses.forEach(exp => {
        const amount = parseFloat(exp.amount) || 0;
        totalOutflows += amount;
        outflowsList.push({
            description: exp.description || 'Expense',
            category: exp.category || 'General',
            date: exp.date,
            amount: amount
        });
    });

    // Add paid booked-in supplier invoices
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

# Write back
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Patched generateCashflowReport() in app.js (v2)")