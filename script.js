const expenseForm = document.getElementById('expense-form');
const expenseName = document.getElementById('expense-name');
const expenseAmount = document.getElementById('expense-amount');
const expenseCategory = document.getElementById('expense-category');
const expenseCurrency = document.getElementById('expense-currency');
const expensesList = document.getElementById('expenses');
const totalDisplay = document.getElementById('total');

// Local Storage Data
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to Update Expense List
function updateExpenses() {
    expensesList.innerHTML = '';
    let total = {};

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${expense.name} - ${expense.currency}${expense.amount} (${expense.category})
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        expensesList.appendChild(li);

        // Calculate Total for Each Currency
        if (!total[expense.currency]) {
            total[expense.currency] = 0;
        }
        total[expense.currency] += Number(expense.amount);
    });

    // Display Totals
    totalDisplay.innerHTML = Object.entries(total)
        .map(([currency, amount]) => `${currency} ${amount.toFixed(2)}`)
        .join(' | ');

    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to Delete Expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpenses();
}

// Form Submit Handler
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const expense = {
        name: expenseName.value,
        amount: expenseAmount.value,
        category: expenseCategory.value,
        currency: expenseCurrency.value,
    };

    expenses.push(expense);
    updateExpenses();

    // Clear Form
    expenseName.value = '';
    expenseAmount.value = '';
    expenseCategory.value = 'Food';
    expenseCurrency.value = 'USD';
});

// Initialize Expenses on Page Load
updateExpenses();
