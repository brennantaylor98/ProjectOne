const router = require('express').Router();
const {  Wallet, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/users/:id', async (req, res) => {
    try {
      const walletData = await Wallet.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });

      const wallet = walletData.get({ plain: true });

      return res.render('dashboard', {
        ...wallet,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      return res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Wallet }],
    });

    const user = userData.get({ plain: true });

    return res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;