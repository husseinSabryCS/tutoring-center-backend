const { Expense } = require('../models');

exports.createExpense = async (req, res) => {
  try {
    const { studentId, courseId, recordedById, amount } = req.body;
    const expense = await Expense.create({ studentId, courseId, recordedById, amount });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { amount } = req.body;
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    expense.amount = amount || expense.amount;
    await expense.save();
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    await expense.destroy();
    res.status(204).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
