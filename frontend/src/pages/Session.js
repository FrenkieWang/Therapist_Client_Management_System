import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";

const HOST_URL = process.env.REACT_APP_HOST_URL || 'http://localhost:5000';
const SESSION_API_URL = `${HOST_URL}/sessions`;
const THERAPIST_API_URL = `${HOST_URL}/therapists`;
const CLIENT_API_URL = `${HOST_URL}/clients`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  text-align: center;

  th, td {
    border: 1px solid black;
    padding: 8px;
  }
`;

const CheckboxDiv= styled.div`
  max-width: 800px;
`


function Session() {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    therapist_id: '',
    session_date: '',
    session_length: '',
    regularity: 'WEEKLY',
    notes: '',
    clientsList: []
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSessions();
    fetchTherapists();
    fetchClients();
  }, []);

  const fetchSessions = () => {
    axios.get(`${SESSION_API_URL}/get`)
      .then(response => setSessions(response.data))
      .catch(error => console.error(error));
  };

  const fetchTherapists = () => {
    axios.get(`${THERAPIST_API_URL}/get`)
      .then(response => setTherapists(response.data))
      .catch(error => console.error(error));
  };

  const fetchClients = () => {
    axios.get(`${CLIENT_API_URL}/get`)
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClientCheckboxChange = (client_id) => {
    setForm(prevForm => {
      const isSelected = prevForm.clientsList.includes(client_id);
      return {
        ...prevForm,
        clientsList: isSelected
          ? prevForm.clientsList.filter(id => id !== client_id)
          : [...prevForm.clientsList, client_id]
      };
    });
  };

  const validateForm = () => {
    const { therapist_id, session_date, session_length, clientsList } = form;
    if (!therapist_id || !session_date || !session_length || clientsList.length === 0) {
      alert("Please fill in all required fields and select at least one client.");
      return false;
    }
    return true;
  };

  const createSession = () => {
    if (!validateForm()) return;

    const payload = {
      therapist_id: form.therapist_id,
      session_date: form.session_date,
      session_length: form.session_length,
      regularity: form.regularity,
      notes: form.notes,
      clientsList: form.clientsList
    };

    axios.post(`${SESSION_API_URL}/create`, payload)
      .then(() => {
        resetForm();
        fetchSessions();
      })
      .catch(error => console.error(error));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toISOString().split('T')[0];
  };

  const editSession = (id) => {
    axios.get(`${SESSION_API_URL}/get/${id}`)
      .then(response => {
        const session = response.data;
        const parsedClients = Array.isArray(session.clientsList)
          ? session.clientsList
          : JSON.parse(session.clientsList);

        setForm({
          therapist_id: session.therapist_id.toString(),
          session_date: formatDate(session.session_date),
          session_length: session.session_length,
          regularity: session.regularity,
          notes: session.notes || '',
          clientsList: parsedClients
        });
        setEditingId(id);
      })
      .catch(error => console.error(error));
  };

  const updateSession = () => {
    if (!validateForm()) return;

    const payload = {
      therapist_id: form.therapist_id,
      session_date: form.session_date,
      session_length: form.session_length,
      regularity: form.regularity,
      notes: form.notes,
      clientsList: form.clientsList
    };

    axios.put(`${SESSION_API_URL}/update/${editingId}`, payload)
      .then(() => {
        resetForm();
        setEditingId(null);
        fetchSessions();
      })
      .catch(error => console.error(error));
  };

  const deleteSession = (id) => {
    axios.delete(`${SESSION_API_URL}/delete/${id}`)
      .then(() => fetchSessions())
      .catch(error => console.error(error));
  };

  const resetForm = () => {
    setForm({
      therapist_id: '',
      session_date: '',
      session_length: '',
      regularity: 'WEEKLY',
      notes: '',
      clientsList: []
    });
    setEditingId(null);
  };

  return (
    <div className="session page">
      <h1>Session Management</h1>
      <Link to="/">Back to HomePage</Link>
      <hr />
      <div>
      <div>
        <label>Therapist:</label>
        {therapists.map(t => (
          <label key={t.therapist_id} style={{ marginRight: '10px', display: 'block' }}>
            <input
              type="radio"
              name="therapist_id"
              value={t.therapist_id}
              checked={form.therapist_id === t.therapist_id.toString()}
              disabled={t.availability === 'NOT TAKING CLIENTS'}
              onChange={handleChange}
            />
            {t.name} ({t.availability})
          </label>
        ))}
      </div>
        <input 
          type="date" 
          name="session_date" 
          value={form.session_date} 
          onChange={handleChange} 
        />
        <input 
          type="number" 
          name="session_length" 
          placeholder="Session Length (min)" 
          value={form.session_length} 
          onChange={handleChange} 
        />
        <select name="regularity" value={form.regularity} onChange={handleChange}>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>
        <input 
          type="text" 
          name="notes" 
          placeholder="Notes" 
          value={form.notes} 
          onChange={handleChange} 
        />
        <div>
          <label>Clients:</label>
          <CheckboxDiv>
            {clients.map(client => {
              const isChecked = form.clientsList.includes(client.client_id);
              const isDisabled = !isChecked && form.clientsList.length >= 3;
              return (
                <label key={client.client_id}>
                  <input 
                    type="checkbox" 
                    checked={isChecked} 
                    disabled={isDisabled} 
                    onChange={() => handleClientCheckboxChange(client.client_id)} 
                  />
                  {client.name} (ID: {client.client_id})
                </label>
              );
            })}
          </CheckboxDiv>
        </div>
        {editingId ? (
          <button onClick={updateSession}>Update Session</button>
        ) : (
          <button onClick={createSession}>Add Session</button>
        )}
      </div>
      <h2>Session List</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Therapist</th>
            <th>Date</th>
            <th>Length</th>
            <th>Regularity</th>
            <th>Notes</th>
            <th>Clients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(session => {
            const therapist = therapists.find(t => t.therapist_id === session.therapist_id);

            const clientIds = JSON.parse(session.clientsList); // SQL stores JSON.stringify()
            const clientNames = clientIds
              .map(id => clients.find(c => c.client_id === id)?.name)
              .filter(Boolean)
              .join(', ');

            return (
              <tr key={session.session_id}>
                <td>{session.session_id}</td>
                <td>{therapist?.name || 'Unknown'}</td>
                <td>{formatDate(session.session_date)}</td>
                <td>{session.session_length} min</td>
                <td>{session.regularity}</td>
                <td>{session.notes}</td>
                <td>{clientNames}</td>
                <td>
                  <button onClick={() => editSession(session.session_id)}>Edit</button>
                  <button onClick={() => deleteSession(session.session_id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Session;