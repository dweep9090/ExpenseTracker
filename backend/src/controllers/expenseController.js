const Expense = require('../models/Expense');

const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (!title || amount === undefined || !category) {
      res.status(400);
      throw new Error('Title, amount, and category are required');
    }

    if (typeof amount !== 'number' || amount <= 0) {
      res.status(400);
      throw new Error('Amount must be a positive number');
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      description,
      date,
      user: req.user._id,
    });

    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};

const getExpenses = async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
};

const getExpenseById = async (req, res, next) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    res.status(200).json(expense);
  } catch (error) {
    next(error);
  }
};

const updateExpense = async (req, res, next) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
      res.status(400);
      throw new Error('Amount must be a positive number');
    }

    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    if (title !== undefined) expense.title = title;
    if (amount !== undefined) expense.amount = amount;
    if (category !== undefined) expense.category = category;
    if (description !== undefined) expense.description = description;
    if (date !== undefined) expense.date = date;

    const updatedExpense = await expense.save();

    res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
};

const deleteExpense = async (req, res, next) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense) {
      res.status(404);
      throw new Error('Expense not found');
    }

    res.status(200).json({
      message: 'Expense deleted successfully',
      expense,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
