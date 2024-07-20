const express = require('express');
const { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post('/', createExpense);
router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
