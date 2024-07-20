const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student');
const Course = require('./course');
const User = require('./user'); // Assuming teacher records the payment

class Expense extends Model {}

Expense.init({
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  paymentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, { sequelize, modelName: 'expense' });

Expense.belongsTo(Student, { foreignKey: 'studentId' });
Expense.belongsTo(Course, { foreignKey: 'courseId' });
Expense.belongsTo(User, { foreignKey: 'recordedById' });

module.exports = Expense;
