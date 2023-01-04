const User = require('./User');
const Wallet = require('./Wallet');
const Expense = require('./Expense')

User.hasOne(Wallet, {
  foreignKey: 'user_id',
});

Wallet.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(Expense, {
  foreignKey: 'user_id',
});

Expense.belongsTo(Wallet, {
  foreignKey: 'user_id'
});

module.exports = { User, Wallet, Expense };
