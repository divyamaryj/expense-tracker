// Wait until the whole page is loaded
window.onload = function () {
  // Get elements from the HTML
  const form = document.getElementById('expense-form');
  const descInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const expenseList = document.getElementById('expense-list');
  const totalDisplay = document.getElementById('total');

  // This array stores all the expenses
  let expenses = [];

  // When the form is submitted
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Stop page from reloading

    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);

    // Validate input
    if (description === '' || isNaN(amount)) {
      alert('Please enter both description and a valid amount.');
      return;
    }

    // Create a new expense object
    const expense = {
      id: Date.now(), // unique ID
      description: description,
      amount: amount
    };

    // Add the expense to the array
    expenses.push(expense);

    // Clear the inputs
    descInput.value = '';
    amountInput.value = '';

    // Update the display
    showExpenses();
  });

  // Function to display all expenses
  function showExpenses() {
    // Clear previous list
    expenseList.innerHTML = '';
    let total = 0;

    expenses.forEach(function (expense) {
      total += expense.amount;

      const li = document.createElement('li');
      li.innerHTML = `
        ${expense.description} - ₹${expense.amount.toFixed(2)}
        <button onclick="deleteExpense(${expense.id})">X</button>
      `;
      expenseList.appendChild(li);
    });

    // Show the total
    totalDisplay.textContent = total.toFixed(2);
  }

  // Function to delete an expense by ID
  window.deleteExpense = function (id) {
    expenses = expenses.filter(function (expense) {
      return expense.id !== id;
    });

    // Update the display
    showExpenses();
  };
};
