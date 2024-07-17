const { Teacher } = require('../models');

exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.findAll();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findByPk(req.params.id);
    if (teacher) {
      res.status(200).json(teacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const [updated] = await Teacher.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedTeacher = await Teacher.findByPk(req.params.id);
      res.status(200).json(updatedTeacher);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const deleted = await Teacher.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Teacher deleted' });
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
