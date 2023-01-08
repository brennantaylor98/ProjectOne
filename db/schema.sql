DROP DATABASE IF EXISTS wallet_db;
CREATE DATABASE wallet_db;


UPDATE Wallet 
   SET Wallet.total_monthly_expenses = Expense.dollar_amount_of_expense 
   FROM Wallet  INNER JOIN  Expense ON Wallet.user_id = Expense.user_id
