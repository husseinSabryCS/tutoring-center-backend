const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../models/student'); // Ensure correct import name
const User = require('../models/user');

const register = async (req, res) => {

  try {

    const { name, email, password } = req.body;
    if(!name || !email || !password){
      res.status(500).json( "name , email and  password  required" );
    }
    const role = "student";
    
    // Check if student with the same email already exists
    const existingStudent = await Student.findOne({ where: { email } });
    if (existingStudent) {
      return res.status(400).json({ error: 'Student with this email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new student record
    const newStudent = await Student.create({ name, email, password: hashedPassword, role });
    
    // Create a new user record (if needed)
    const newUser = await User.create({ name, email, password: hashedPassword, role });

    // Send response
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const login = async (req, res) => {
  
  const { email, password } = req.body;
  if( !email || !password){
    res.status(500).json( "email and  password  required" );
  }
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, role: user.role }, 'secret');
  res.status(200).json({ token });
};

module.exports = { register, login };
