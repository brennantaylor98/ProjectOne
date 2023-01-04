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

  document
  .querySelector('.expense-form')
  .addEventListener('submit', expenseFormHandler);


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Isaac-2010",
  database: "wallet"
});


con.connect(function(err) {
  if (err) throw err;
  var sql = "UPDATE Wallet SET Wallet.total_monthly_expenses = Expense.dollar_amount_of_expense FROM Wallet  INNER JOIN  Expense ON Wallet.user_id = Expense.user_id";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});


