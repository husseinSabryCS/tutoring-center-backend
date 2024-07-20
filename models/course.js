const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

class Course extends Model {}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fee: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  teacherId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Course'
});

Course.belongsTo(User, { foreignKey: 'teacherId', as: 'teacher' });
User.hasMany(Course, { foreignKey: 'teacherId', as: 'courses' });

module.exports = Course;
