const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class StudentCourse extends Model {}

StudentCourse.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Courses',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'StudentCourse'
});

module.exports = StudentCourse;
