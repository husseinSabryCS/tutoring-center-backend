const express = require('express');
const router = express.Router();
const userController = require('../controllers/adminController');

// Define routes
router.post('/createUsers', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser); 
router.get('/users', userController.getAllUsers);
router.put('/blockUsers', userController.BlockUser);
router.put('/unblockUsers', userController.UNblockUser);
router.get('/courses/students/:courseId', userController.getStudentsInCourse);
module.exports = router;
