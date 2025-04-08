const express = require('express');
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

const router = express.Router();

router.get('/get', getAllClients);
router.get('/get/:client_id', getClientById);
router.post('/create', createClient);
router.put('/update/:client_id', updateClient);
router.delete('/delete/:client_id', deleteClient);

module.exports = router;
