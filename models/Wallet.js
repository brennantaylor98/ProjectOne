const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

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
        monthly_income: {
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


module.exports = Wallet;