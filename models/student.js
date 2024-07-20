const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Student extends Model {}

Student.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true, // Ensure email is unique
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, modelName: 'student' });

module.exports = Student;
