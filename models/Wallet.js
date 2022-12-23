const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

<<<<<<< HEAD

=======
class Wallet extends Model {}

Wallet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        current_savings: {
            type: DataTypes.FLOAT,
          },
        total_monthly_expenses: {
            type: DataTypes.FLOAT,
          },
        goal: {
            type: DataTypes.FLOAT,
          },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Wallet',
    }
)
>>>>>>> 064302422da4c211b23f3ef6d903b2c415c3c5b3

module.exports = Wallet;