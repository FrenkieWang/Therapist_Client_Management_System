const express = require('express');
const {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');

const router = express.Router();

router.get('/get', getAllSessions);
router.get('/get/:session_id', getSessionById);
router.post('/create', createSession);
router.put('/update/:session_id', updateSession);
router.delete('/delete/:session_id', deleteSession);

module.exports = router;
