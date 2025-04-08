const db = require('../db'); 

const getAllClients = (request, response) => {
  db.execute('SELECT * FROM Client')
    .then(([rows]) => response.json(rows))
    .catch(error => response.status(500).send(error.message));
};

const getClientById = (request, response) => {
  db.execute('SELECT * FROM Client WHERE client_id = ?', [request.params.client_id])
    .then(([rows]) => response.json(rows[0] || {}))
    .catch(error => response.status(500).send(error.message));
};

const createClient = (request, response) => {
  const { name, email, phone_number } = request.body;
  db.execute(
    'INSERT INTO Client (name, email, phone_number) VALUES (?, ?, ?)', 
    [name, email, phone_number]
  )
    .then(() => response.send('Client added successfully'))
    .catch(error => response.status(500).send(error.message));
};

const updateClient = (request, response) => {
  const { name, email, phone_number } = request.body;
  db.execute(
    'UPDATE Client SET name = ?, email = ?, phone_number = ? WHERE client_id = ?', 
    [name, email, phone_number, request.params.client_id]
  )
    .then(() => response.send('Client updated successfully'))
    .catch(error => response.status(500).send(error.message));
};

const deleteClient = (request, response) => {
  db.execute('DELETE FROM Client WHERE client_id = ?', [request.params.client_id])
    .then(() => response.send('Client deleted successfully'))
    .catch(error => response.status(500).send(error.message));
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient
};
