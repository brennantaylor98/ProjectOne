var  express = require('express');
var  bodyParser = require('body-parser');

var  app = express();
var  router = express.Router();
var  router1 = express.Router();
var  router2 = express.Router();

const { Expense, Wallet } = require('../../models');
const withAuth = require('../../utils/auth');

app.use(bodyParser.urlencoded({ extended:  true }));
app.use(bodyParser.json());

app.use('/api', router);

router1.get('/', async (req, res) => {
  try {
    const expensesData = await Expense.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    const expenses = expensesData.map((wallet) => wallet.get({ plain: true }));

    res.status(200).json({ expenses });

  } catch (err) {
    res.status(500).json(err);
  }
});

router1.get('/savings', async (req, res) => {
  try {
    const expensesData = await Expense.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    const walletsData = await Wallet.findAll({
      where: {
        user_id: req.session.user_id,
      }
    });

    const expenses = expensesData.map((wallet) => wallet.get({ plain: true }));
    const wallet = walletsData.map((wallet) => wallet.get({ plain: true }))[0];

    let savings = wallet.monthly_income;

    expenses.forEach(expense => {
      savings -= expense.dollar_amount_of_expense;
    })

    res.status(200).json({ savings, income: wallet.monthly_income  });

  } catch (err) {
    res.status(500).json(err);
  }
});

router1.post('/', withAuth, async (req, res) => {
    try {
      const ExpenseData = await Expense.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(ExpenseData);
      console.log("Expense post is working")
    } catch (err) {
      res.status(400).json(err);
    }
  });
/*
  router2.get('/', withAuth, async (req, res, next) => {
    console.log("User Router Working");
    res.end();

  });
  */

  /*

  router2.get('/', async (req, res) => {
    try {
      // Get all expenses and JOIN with user data
      const expenseData = await Expense.findAll({
        include: [
          {
            model: User,
            attributes: ['name'],
          },
        ],
      });
  
      const expenses = expenseData.map((expense) => expense.get({ plain: true }));

      console.log("Expense get is Working");

      
      // Pass serialized data and session flag into template
      res.render('expense', { 
        expenses,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });







  app.get('/products', function (req, res ) {
    // assuming you get the datas in column.value
  request = new Request("select count * from table where ArticleId=24588 for json path", function(err, rowCount) {
    if (err) {
      console.log(err);
    } else {
      console.log('total rows fetched ') ;
    }
    connection.close();
  }
/*
  router.post('/', async (req, res) => {
    try {
        await pool.connect();
        const result = await pool.request()
            .input('id', req.body.Code)
            .input('source_of_expense', req.body.source_of_expense)
            .input('dollar_amount', req.body.dollar_amount_of_expense)
            .input('user_id', req.body.user_id)
            .query(`
                INSERT INTO Employee (Code, Salary, Job, Department, Name) 
                OUTPUT inserted.Id 
                VALUES (@Code, @Salary, @Job, @Department, @Name);
            `);
        const employee = req.body;
        employee.Id = result.recordset[0].Id;
        res.json(employee);
    } catch (error) {
        res.status(500).json(error);
    }
});

app.use(router1)
app.use(router2)

router.use((request, response, next) => {
  console.log('middleware');
  next();
});
 
 
router.route('/expenses').get((request, response) => {
  Db.getExpenses().then((data) => {
    response.json(data[0]);
  })
})




router.post('/', withAuth, async (req, res) => {
  try {
    const ExpenseData = await Expense.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(ExpenseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

/*

router.route('/orders/:id').get((request, response) => {
  Db.getOrder(request.params.id).then((data) => {
    response.json(data[0]);
  })
})


router.route('/expenses').post((request, response) => {
  let  order = { ...request.body }
  Db.addExpense(order).then(data  => {
    response.status(201).json(data);
  })
})
  
  
var  port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);

*/



module.exports = router1;
/*
module.exports = router2;
*/