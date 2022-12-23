const sequelize = require('../config/connection');
const { User, Wallet } = require('../models');

const userData = require('./userData.json');
const walletData = require('./walletData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const wallet of walletData) {
    await Wallet.create({
      ...wallet,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
