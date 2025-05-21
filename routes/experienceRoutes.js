const express = require('express');
const {
  getExperiences,
  getExperience,
  createExperience,
  updateExperience,
  deleteExperience,
} = require('../controllers/experienceController');

const router = express.Router();

router.route('/')
  .get(getExperiences)
  .post(createExperience);

router.route('/:id')
  .get(getExperience)
  .put(updateExperience)
  .delete(deleteExperience);

module.exports = router;