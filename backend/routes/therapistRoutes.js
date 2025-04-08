const express = require('express');
const {
  getAllTherapists,
  getTherapistById,
  createTherapist,
  updateTherapist,
  deleteTherapist
} = require('../controllers/therapistController');

const router = express.Router();

router.get('/get', getAllTherapists);
router.get('/get/:therapist_id', getTherapistById);
router.post('/create', createTherapist);
router.put('/update/:therapist_id', updateTherapist);
router.delete('/delete/:therapist_id', deleteTherapist);

module.exports = router;
