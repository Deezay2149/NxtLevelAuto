import re

# Read the file
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the expenses section in generateCashflowReport
pattern = r"(    // Calculate outflows from expenses\n    const expenses = JSON\.parse\(localStorage\.getItem\('expenses'\) \|\| '\[\]'\);\n    const filteredExpenses = expenses\.filter\(exp => \{\n        if \(!exp\.date\) return false;\n        // Parse date string \(YYYY-MM-DD format\) and create date at start of day\n        const expDateParts = exp\.date\.split\('T'\)\[0\]\.split\('-'\);\n        const expDate = new Date\(parseInt\(expDateParts\[0\]\), parseInt\(expDateParts\[1\]\) - 1, parseInt\(expDateParts\[2\]\)\);\n        const expDateTime = expDate\.getTime\(\);\n        const startTime = startDate\.getTime\(\);\n        const endTime = endDate\.getTime\(\);\n        return expDateTime >= startTime && expDateTime <= endTime;\n    \}\);\n\n    let totalOutflows = 0;\n    let outflowsList = \[\];\n\n    filteredExpenses\.forEach\(exp => \{\n        const amount = parseFloat\(exp\.amount\) \|\| 0;\n        totalOutflows \+= amount;\n        outflowsList\.push\(\{\n            description: exp\.description \|\| 'Expense',\n            category: exp\.category \|\| 'General',\n            date: exp\.date,\n            amount: amount\n        \}\);\n    \}\);)"

replacement = r"""    // Calculate outflows from expenses
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const filteredExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        // Parse date string (YYYY-MM-DD format) and create date at start of day
        const expDateParts = exp.date.split('T')[0].split('-');
        const expDate = new Date(parseInt(expDateParts[0]), parseInt(expDateParts[1]) - 1, parseInt(expDateParts[2]));
        const expDateTime = expDate.getTime();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        return expDateTime >= startTime && expDateTime <= endTime;
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

content = re.sub(pattern, replacement, content)

# Write back
with open('app.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Patched generateCashflowReport() in app.js")