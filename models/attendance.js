const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Attendance extends Model {}

Attendance.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('present', 'absent'),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Attendance'
});

module.exports = Attendance;
