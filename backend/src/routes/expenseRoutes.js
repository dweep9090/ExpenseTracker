const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');

const router = express.Router();

router.use(authMiddleware);

router.route('/').post(createExpense).get(getExpenses);

router
  .route('/:id')
  .get(getExpenseById)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
