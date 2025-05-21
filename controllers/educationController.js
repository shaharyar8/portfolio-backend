const Education = require('../models/Education');

exports.getEducations = async (req, res, next) => {
  try {
    const educations = await Education.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, count: educations.length, data: educations });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.getEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, error: 'Education record not found' });
    }
    res.status(200).json({ success: true, data: education });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.createEducation = async (req, res, next) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, data: education });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.updateEducation = async (req, res, next) => {
  try {
    let education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, error: 'Education record not found' });
    }
    education = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: education });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ success: false, error: 'Education record not found' });
    }
    await education.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};
