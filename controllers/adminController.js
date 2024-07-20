const User = require('../models/user');
const Course = require('../models/course');
const bcrypt = require('bcryptjs');
const Student = require('../models/student');


exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if all required fields are provided
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create user in the User model
    const user = await User.create({ name, email, password: hashedPassword, role });


    // Respond with the created user
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = password || user.password;
    user.role = role || user.role;

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.BlockUser = async (req, res) => {
  try {
    const userId= req.body.userId
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.isBlocked = true;
    await user.save();
    res.status(400).json({user });
  } catch (error) {
    throw new Error(`Failed to block user: ${error.message}`);
  }
}
exports.UNblockUser = async (req, res) => {
  try {
    const userId= req.body.userId
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.isBlocked = false;
    await user.save();
    res.status(400).json({user });
  } catch (error) {
    throw new Error(`Failed to block user: ${error.message}`);
  }
}
exports.getStudents=async (req,res)=> {
  try{
   const user =await User.findAll({ where: { role: 'student' } });
   res.status(400).json({user });
  }catch (error) {
    throw new Error(`Failed to  get student : ${error.message}`);
  }

  
}
exports.getStudentsInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    console.log(`Course ID: ${courseId}`);

    const course = await Course.findByPk(courseId, {
      include: {
        model: User,
        as: 'students',
        where: { role: 'student' },
        attributes: ['id', 'name', 'email']
      }
    });

    if (!course) {
      console.error('Course not found');
      return res.status(404).json({ error: 'Course not found' });
    }

    console.log('Course found:', course);
    res.status(200).json(course.students);
  } catch (error) {
    console.error('Error fetching students in course:', error);
    res.status(400).json({ error: error.message });
  }
};