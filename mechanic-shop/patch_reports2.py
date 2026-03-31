import re

# Read the file
with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to match the expenses section in generateProfitLossReport
pattern = r"(    // Calculate expenses\n    const expenses = JSON\.parse\(localStorage\.getItem\('expenses'\) \|\| '\[\]'\);\n    console\.log\('P&L - Total expenses in storage:', expenses\.length\);\n\n    const filteredExpenses = expenses\.filter\(exp => \{\n        if \(!exp\.date\) return false;\n        // Parse date string \(YYYY-MM-DD format\) and create date at start of day\n        const expDateParts = exp\.date\.split\('T'\)\[0\]\.split\('-'\);\n        const expDate = new Date\(parseInt\(expDateParts\[0\]\), parseInt\(expDateParts\[1\]\) - 1, parseInt\(expDateParts\[2\]\)\);\n        // Set time to start/end of day for proper comparison\n        const expDateTime = expDate\.getTime\(\);\n        const startTime = startDate\.getTime\(\);\n        const endTime = endDate\.getTime\(\);\n        return expDateTime >= startTime && expDateTime <= endTime;\n    \}\);\n\n    console\.log\('P&L - Filtered expenses:', filteredExpenses\.length\);\n\n    let totalExpenses = 0;\n    const expenseCategories = \{\};\n\n    filteredExpenses\.forEach\(exp => \{\n        const amount = parseFloat\(exp\.amount\) \|\| 0;\n        totalExpenses \+= amount;\n\n        const category = exp\.category \|\| 'Other';\n        if \(!expenseCategories\[category\]\) \{\n            expenseCategories\[category\] = 0;\n        \}\n        expenseCategories\[category\] \+= amount;\n    \}\);)"

replacement = r"""    // Calculate expenses
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    console.log('P&L - Total expenses in storage:', expenses.length);

    const filteredExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        // Parse date string (YYYY-MM-DD format) and create date at start of day
        const expDateParts = exp.date.split('T')[0].split('-');
        const expDate = new Date(parseInt(expDateParts[0]), parseInt(expDateParts[1]) - 1, parseInt(expDateParts[2]));
        // Set time to start/end of day for proper comparison
        const expDateTime = expDate.getTime();
        const startTime = startDate.getTime();
        const endTime = endDate.getTime();
        return expDateTime >= startTime && expDateTime <= endTime;
    });

    console.log('P&L - Filtered expenses:', filteredExpenses.length);

    // Add PAID booked-in supplier invoices to expenses
    const bookInRecords = JSON.parse(localStorage.getItem('bookInRecords') || '[]');
    console.log('P&L - Total booked-in records:', bookInRecords.length);

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

    console.log('P&L - Paid booked-in records:', paidBookInRecords.length);

    let totalExpenses = 0;
    const expenseCategories = {};

    // Add regular expenses
    filteredExpenses.forEach(exp => {
        const amount = parseFloat(exp.amount) || 0;
        totalExpenses += amount;

        const category = exp.category || 'Other';
        if (!expenseCategories[category]) {
            expenseCategories[category] = 0;
        }
        expenseCategories[category] += amount;
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