const sequelize = require('sequelize');
require('dotenv').config();
let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    'wallet_db',
    'ac93yyiydjh62ly1',
    'hryask8v7l9cjs5h',
    {
      host: 'qz8si2yulh3i7gl3.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = sequelize;

