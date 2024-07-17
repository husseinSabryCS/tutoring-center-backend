const sequelize = require('../config/database');
const User = require('./user');
const Course = require('./course');
const Attendance = require('./attendance');

// التأكد من تعريف النماذج بشكل صحيح
sequelize.models.User = User;
sequelize.models.Course = Course;
sequelize.models.Attendance = Attendance;

// إعداد العلاقات بين الجداول
User.belongsToMany(Course, { through: 'UserCourses' });
Course.belongsToMany(User, { through: 'UserCourses' });

User.hasMany(Attendance);
Attendance.belongsTo(User);

Course.hasMany(Attendance);
Attendance.belongsTo(Course);

sequelize.sync();

module.exports = { User, Course, Attendance };
