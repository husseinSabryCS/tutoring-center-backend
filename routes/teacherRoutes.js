const express = require('express');
const {  getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../controllers/teacherController');
const router = express.Router();
// [AuthMiddleware.verifyToken, AuthMiddleware.authorize(['admin'])]

router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.put('/:id', updateTeacher);
router.delete('/:id', deleteTeacher);

module.exports = router;
