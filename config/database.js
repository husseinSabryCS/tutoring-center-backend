const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tutoring-center-db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306  // تأكد من أن المنفذ هو المنفذ الصحيح لـ MySQL
});

module.exports = sequelize;
  