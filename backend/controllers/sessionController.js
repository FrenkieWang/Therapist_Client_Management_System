const db = require('../db');

const getAllSessions = (request, response) => {
  db.execute('SELECT * FROM Session')
    .then(([rows]) => response.json(rows))
    .catch(error => response.status(500).send(error.message));
};

const getSessionById = (request, response) => {
  db.execute('SELECT * FROM Session WHERE session_id = ?', [request.params.session_id])
    .then(([rows]) => response.json(rows[0] || {}))
    .catch(error => response.status(500).send(error.message));
};

const createSession = (request, response) => {
  const {
    therapist_id,
    clientsList, // should be an array of client IDs
    notes,
    session_date,
    session_length,
    regularity
  } = request.body;

  db.execute(
    'INSERT INTO Session (therapist_id, clientsList, notes, session_date, session_length, regularity) VALUES (?, ?, ?, ?, ?, ?)',
    [
      therapist_id,
      JSON.stringify(clientsList),
      notes,
      session_date,
      session_length,
      regularity
    ]
  )
    .then(() => response.send('Session added successfully'))
    .catch(error => response.status(500).send(error.message));
};

const updateSession = (request, response) => {
  const {
    therapist_id,
    clientsList, // should be an array of client IDs
    notes,
    session_date,
    session_length,
    regularity
  } = request.body;

  db.execute(
    'UPDATE Session SET therapist_id = ?, clientsList = ?, notes = ?, session_date = ?, session_length = ?, regularity = ? WHERE session_id = ?',
    [
      therapist_id,
      JSON.stringify(clientsList),
      notes,
      session_date,
      session_length,
      regularity,
      request.params.session_id
    ]
  )
    .then(() => response.send('Session updated successfully'))
    .catch(error => response.status(500).send(error.message));
};

const deleteSession = (request, response) => {
  db.execute('DELETE FROM Session WHERE session_id = ?', [request.params.session_id])
    .then(() => response.send('Session deleted successfully'))
    .catch(error => response.status(500).send(error.message));
};

module.exports = {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession
};
