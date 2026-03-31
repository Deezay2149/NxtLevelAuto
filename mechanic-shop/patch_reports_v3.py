# Read the file
with open('app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with "let totalOutflows = 0;" in generateCashflowReport
# Then insert the booked-in code before it
insert_index = -1
for i, line in enumerate(lines):
    if 'let totalOutflows = 0;' in line and i > 3200 and i < 3300:
        insert_index = i
        break

if insert_index > 0:
    booked_in_code = '''    // Calculate outflows from PAID booked-in supplier invoices
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

'''
    lines.insert(insert_index, booked_in_code)
    
    # Now modify the forEach to add booked-in records
    # Find the forEach for filteredExpenses and add booked-in after
    for j in range(insert_index + len(booked_in_code.split('\n')), len(lines)):
        if 'filteredExpenses.forEach' in lines[j]:
            # Find the closing }); of this forEach
            brace_count = 0
            start_k = j
            for k in range(j, len(lines)):
                if 'filteredExpenses.forEach' in lines[k]:
                    brace_count = 1
                if '{' in lines[k]:
                    brace_count += lines[k].count('{')
                if '}' in lines[k]:
                    brace_count -= lines[k].count('}')
                if brace_count == 0 and k > j:
                    # Insert booked-in forEach after this closing
                    booked_in_foreach = '''    // Add paid booked-in supplier invoices
    paidBookInRecords.forEach(record => {
        const amount = parseFloat(record.totalValue) || 0;
        totalOutflows += amount;
        outflowsList.push({
            description: 'Booked-In: ' + (record.supplierName || 'Unknown Supplier'),
            category: 'Supplier Invoice',
            date: record.date,
            amount: amount
        });
    });

'''
                    lines.insert(k + 1, booked_in_foreach)
                    break
            break
    
    # Also need to add comment before totalOutflows
    for j in range(insert_index, len(lines)):
        if 'let totalOutflows' in lines[j]:
            lines[j] = '    let totalOutflows = 0;\n    let outflowsList = [];\n\n    // Add regular expenses\n'
            break
    
    # Write back
    with open('app.js', 'w', encoding='utf-8') as f:
        f.writelines(lines)
    print("✅ Patched generateCashflowReport() in app.js (v3)")
else:
    print("❌ Could not find insertion point")