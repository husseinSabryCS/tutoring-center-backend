const { Student } = require('../models');

// إنشاء طالب جديد
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// جلب جميع الطلاب
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// جلب طالب واحد بناءً على الـ ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// تحديث بيانات الطالب
exports.updateStudent = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedStudent = await Student.findByPk(req.params.id);
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// حذف طالب
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Student deleted' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
