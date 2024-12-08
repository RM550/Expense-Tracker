document.getElementById("addExpense").addEventListener("click", addExpense);
document.getElementById("generateReport").addEventListener("click", generateReport);
document.getElementById("exportCSV").addEventListener("click", exportCSV);

let expenses = [];
let totalExpense = 0;

function addExpense() {
    const category = document.getElementById("category").value;
    const amount = document.getElementById("amount").value;
    const date = document.getElementById("date").value;
    const isRecurring = document.getElementById("recurring").checked;

    if (!amount || !date) {
        alert("Please fill all fields");
        return;
    }

    const expense = { category, amount: parseFloat(amount), date, recurring: isRecurring };
    expenses.push(expense);
    totalExpense += parseFloat(amount);
    displayExpenses();
    document.getElementById("amount").value = "";
    document.getElementById("recurring").checked = false;  // Reset checkbox
}

function displayExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    
    expenses.forEach(expense => {
        const expenseElement = document.createElement("div");
        expenseElement.classList.add("expense-item");
        expenseElement.innerHTML = `
            <p>${expense.category} - ${expense.amount} USD - ${expense.date} ${expense.recurring ? "(Recurring)" : ""}</p>
        `;
        expenseList.appendChild(expenseElement);
    });

    document.getElementById("totalExpense").innerText = totalExpense;
}

function generateReport() {
    let report = "Expense Report:\n\n";
    expenses.forEach(expense => {
        report += `${expense.category} - ${expense.amount} USD on ${expense.date} ${expense.recurring ? "(Recurring)" : ""}\n`;
    });

    report += `\nTotal Expense: ${totalExpense} USD`;

    alert(report);
}

function exportCSV() {
    let csvContent = "Category,Amount,Date,Recurring\n";
    expenses.forEach(expense => {
        csvContent += `${expense.category},${expense.amount},${expense.date},${expense.recurring ? "Yes" : "No"}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "expenses.csv";
    link.click();
}
