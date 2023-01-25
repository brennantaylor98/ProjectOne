const router = require('express').Router();
const { Wallet, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }

  try {
    // Get all wallets and JOIN with user data
    const walletData = await Wallet.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const wallets = walletData.map((wallet) => wallet.get({ plain: true }));

    // Pass serialized data and session flag into template
    return res.render('home', { 
      wallets,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get('/dashboard/:id', async (req, res) => {
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

    console.log(wallet);

    return res.render('wallet', {
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


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }

  return res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }

  return res.render('signup');
});

module.exports = router;
