const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('student', 'teacher', 'admin', 'assistant_teacher'),
    allowNull: false
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }   
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;
