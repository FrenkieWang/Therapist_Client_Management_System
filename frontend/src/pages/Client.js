import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";

const HOST_URL = 'http://localhost:5000';
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

function Client() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get(`${CLIENT_API_URL}/get`)
      .then(response => setClients(response.data))
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, phone_number } = form;
    if (!name || !email || !phone_number) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const createClient = () => {
    if (!validateForm()) return;

    axios.post(`${CLIENT_API_URL}/create`, form)
      .then(() => {
        setForm({ name: '', email: '', phone_number: '' });
        fetchClients();
      })
      .catch(error => console.error(error));
  };

  const editClient = (id) => {
    axios.get(`${CLIENT_API_URL}/get/${id}`)
      .then(response => {
        setForm(response.data);
        setEditingId(id);
      })
      .catch(error => console.error(error));
  };

  const updateClient = () => {
    if (!validateForm()) return;

    axios.put(`${CLIENT_API_URL}/update/${editingId}`, form)
      .then(() => {
        setForm({ name: '', email: '', phone_number: '' });
        setEditingId(null);
        fetchClients();
      })
      .catch(error => console.error(error));
  };

  const deleteClient = (id) => {
    axios.delete(`${CLIENT_API_URL}/delete/${id}`)
      .then(() => fetchClients())
      .catch(error => console.error(error));
  };

  return (
    <div className="client page">
      <h1>Client Management</h1>
      <Link to="/">Back to HomePage</Link>
      <hr />

      {/* Form */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={form.phone_number}
          onChange={handleChange}
        />

        {editingId ? (
          <button onClick={updateClient}>Update Client</button>
        ) : (
          <button onClick={createClient}>Add Client</button>
        )}
      </div>

      {/* Client List Table */}
      <h2>Client List</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.client_id}>
              <td>{client.client_id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone_number}</td>
              <td>
                <button onClick={() => editClient(client.client_id)}>Edit</button>
                <button onClick={() => deleteClient(client.client_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Client;
