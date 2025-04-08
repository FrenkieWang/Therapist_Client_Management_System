const db = require('../db'); 

const getAllTherapists = (request, response) => {
  db.execute('SELECT * FROM Therapist')
    .then(([rows]) => response.json(rows))
    .catch(error => response.status(500).send(error.message));
};

const getTherapistById = (request, response) => {
  db.execute('SELECT * FROM Therapist WHERE therapist_id = ?', [request.params.therapist_id])
    .then(([rows]) => response.json(rows[0] || {}))
    .catch(error => response.status(500).send(error.message));
};

const createTherapist = (request, response) => {
  const { title, name, email, location, years_of_practice, availability } = request.body;
  db.execute(
    'INSERT INTO Therapist (title, name, email, location, years_of_practice, availability) VALUES (?, ?, ?, ?, ?, ?)', 
    [title, name, email, location, years_of_practice, availability]
  )
    .then(() => response.send('Therapist added successfully'))
    .catch(error => response.status(500).send(error.message));
};

const updateTherapist = (request, response) => {
  const { title, name, email, location, years_of_practice, availability } = request.body;
  db.execute(
    'UPDATE Therapist SET title = ?, name = ?, email = ?, location = ?, years_of_practice = ?, availability = ? WHERE therapist_id = ?', 
    [title, name, email, location, years_of_practice, availability, request.params.therapist_id]
  )
    .then(() => response.send('Therapist updated successfully'))
    .catch(error => response.status(500).send(error.message));
};

const deleteTherapist = (request, response) => {
  db.execute('DELETE FROM Therapist WHERE therapist_id = ?', [request.params.therapist_id])
    .then(() => response.send('Therapist deleted successfully'))
    .catch(error => response.status(500).send(error.message));
};

module.exports = {
  getAllTherapists,
  getTherapistById,
  createTherapist,
  updateTherapist,
  deleteTherapist
};
