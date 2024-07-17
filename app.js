const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/students', studentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/attendances', attendanceRoutes);
module.exports = app;
