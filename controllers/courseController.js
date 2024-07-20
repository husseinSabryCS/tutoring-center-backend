const Course = require('../models/course');
const User = require('../models/user');

exports.createCourse = async (req, res) => {
  try {
    const { name, description, fee, teacherId } = req.body;

    // التحقق من أن المعلم موجود
    const teacher = await User.findByPk(teacherId);
    if (!teacher) {
      return res.status(400).json({ error: 'Invalid teacher ID' });
    }

    // التحقق من عدم وجود دورة بنفس الاسم لنفس المعلم
    const existingCourse = await Course.findOne({ where: { name, teacherId } });
    if (existingCourse) {
      return res.status(400).json({ error: 'Course name already exists for this teacher' });
    }

    // إنشاء الدورة الجديدة
    const course = await Course.create({ name, description, fee, teacherId });
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: User,
        as: 'teacher',
        attributes: ['id', 'name'] 
      }
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      res.status(200).json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.updateCourse = async (req, res) => {
  try {
    const { name, description, fee, teacherId } = req.body;
    const { id } = req.params;

    if (!name && !description && !fee && !teacherId) {
      return res.status(200).json("nothing to update");
    }

    const [updated] = await Course.update(req.body, { where: { id } });

    if (updated) {
      const updatedCourse = await Course.findByPk(id);
      res.status(200).json(updatedCourse);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
