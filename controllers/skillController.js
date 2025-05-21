const Skill = require('../models/Skill');

exports.getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ level: -1 });
    res.status(200).json({ success: true, count: skills.length, data: skills });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.getSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }
    res.status(200).json({ success: true, data: skill });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    if (err.code === 11000) {
        return res.status(400).json({ success: false, error: 'Skill name already exists' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.updateSkill = async (req, res, next) => {
  try {
    let skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }
    skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true, data: skill });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    if (err.code === 11000) {
        return res.status(400).json({ success: false, error: 'Skill name already exists' });
    }
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};

exports.deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, error: 'Skill not found' });
    }
    await skill.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    if (err.name === 'CastError') {
        return res.status(400).json({ success: false, error: 'Invalid ID format' });
    }
    res.status(500).json({ success: false, error: 'Server Error: ' + err.message });
  }
};
