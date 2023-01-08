const expenseFormHandler = async (event) => {
    event.preventDefault();
  
    const source_of_expense = document.querySelector('#source-of-expense').value.trim();
    const dollar_amount_of_expense = document.querySelector('#dollar-amount').value.trim();
  
    if (source_of_expense && dollar_amount_of_expense) {
      const response = await fetch('/api/expenses', {
        method: 'POST',
        body: JSON.stringify({ source_of_expense, dollar_amount_of_expense }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  const showAddExpense = () => {
    document.getElementById("expmodal").classList.remove('hiddensection');
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch('/api/expenses/savings', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

      if (response.ok) {
        const { income, savings } = await response.json();
        document.getElementById("monthlyinctext").innerHTML=`$${income.toFixed(2)}`;
        document.getElementById("monthlysavtext").innerHTML=`$${savings.toFixed(2)}`;

      } else {
        alert(response.statusText);
      }
  });

  document
  .querySelector('#addExpenseBtn')
  .addEventListener('click', showAddExpense);


  document
  .querySelector('.expense-form')
  .addEventListener('submit', expenseFormHandler);


