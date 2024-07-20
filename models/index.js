const sequelize = require('../config/database');
const User = require('./user');
const Course = require('./course');
const Attendance = require('./attendance');
const Expense = require('./expense');
const StudentCourse = require('./StudentCourse');

// التأكد من تعريف النماذج بشكل صحيح
sequelize.models.User = User;
sequelize.models.Course = Course;
sequelize.models.Attendance = Attendance;
sequelize.models.Expense = Expense;

// إعداد العلاقات بين الجداول
User.belongsToMany(Course, { through: StudentCourse, as: 'enrolledCourses', foreignKey: 'userId' });
Course.belongsToMany(User, { through: StudentCourse, as: 'students', foreignKey: 'courseId' });

User.hasMany(Attendance);
Attendance.belongsTo(User);

Course.hasMany(Attendance);
Attendance.belongsTo(Course);

StudentCourse.belongsTo(User, { foreignKey: 'userId' });
StudentCourse.belongsTo(Course, { foreignKey: 'courseId' });

StudentCourse.belongsTo(User, { foreignKey: 'userId' });
StudentCourse.belongsTo(Course, { foreignKey: 'courseId' });

StudentCourse.hasMany(Expense, { foreignKey: 'studentCourseId' });
Course.hasMany(Expense, { foreignKey: 'courseId' });
User.hasMany(Expense, { foreignKey: 'recordedById' });

sequelize.sync();

module.exports = { User, Course, Attendance, Expense, StudentCourse };
