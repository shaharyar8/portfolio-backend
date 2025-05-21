const Experience = require('../models/Experience');

exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ startDate: -1 });
    res.status(200).json({ success: true, count: experiences.length, data: experiences });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.getExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, error: 'Work experience not found' });
    }
    res.status(200).json({ success: true, data: experience });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.createExperience = async (req, res, next) => {
  try {
    if (req.body.isCurrent) {
        req.body.endDate = null;
    }
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, data: experience });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.updateExperience = async (req, res, next) => {
  try {
    let experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, error: 'Work experience not found' });
    }
    if (req.body.isCurrent === true && req.body.endDate !== null) {
        req.body.endDate = null;
    } else if (req.body.isCurrent === false && !req.body.endDate) {
    }

    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: experience });
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

exports.deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ success: false, error: 'Work experience not found' });
    }
    await experience.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};
