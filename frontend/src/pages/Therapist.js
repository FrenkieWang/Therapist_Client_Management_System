import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import styled from "styled-components";

const HOST_URL = process.env.REACT_APP_HOST_URL || 'http://localhost:5000';
const THERAPIST_API_URL = `${HOST_URL}/therapists`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid black;
  text-align: center;

  th, td {
    border: 1px solid black;
    padding: 8px;
  }
`;

function Therapist() {
  const [therapists, setTherapists] = useState([]);
  const [form, setForm] = useState({
    title: '',
    name: '',
    email: '',
    location: '',
    years_of_practice: '',
    availability: 'NOT TAKING CLIENTS'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = () => {
    axios.get(`${THERAPIST_API_URL}/get`)
      .then(response => setTherapists(response.data))
      .catch(error => console.error(error));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { title, name, email, location, years_of_practice, availability } = form;
    if (!title || !name || !email || !location || !years_of_practice || !availability) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const createTherapist = () => {
    if (!validateForm()) return;

    axios.post(`${THERAPIST_API_URL}/create`, form)
      .then(() => {
        setForm({
          title: '',
          name: '',
          email: '',
          location: '',
          years_of_practice: '',
          availability: 'NOT TAKING CLIENTS'
        });
        fetchTherapists();
      })
      .catch(error => console.error(error));
  };

  const editTherapist = (id) => {
    axios.get(`${THERAPIST_API_URL}/get/${id}`)
      .then(response => {
        setForm(response.data);
        setEditingId(id);
      })
      .catch(error => console.error(error));
  };

  const updateTherapist = () => {
    if (!validateForm()) return;

    axios.put(`${THERAPIST_API_URL}/update/${editingId}`, form)
      .then(() => {
        setForm({
          title: '',
          name: '',
          email: '',
          location: '',
          years_of_practice: '',
          availability: 'NOT TAKING CLIENTS'
        });
        setEditingId(null);
        fetchTherapists();
      })
      .catch(error => console.error(error));
  };

  const deleteTherapist = (id) => {
    axios.delete(`${THERAPIST_API_URL}/delete/${id}`)
      .then(() => fetchTherapists())
      .catch(error => console.error(error));
  };

  return (
    <div className="therapist page">
      <h1>Therapist Management</h1>
      <Link to="/">Back to HomePage</Link>
      <hr />

      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
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
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <input
          type="number"
          name="years_of_practice"
          placeholder="Years of Practice"
          value={form.years_of_practice}
          onChange={handleChange}
        />
        <select
          name="availability"
          value={form.availability}
          onChange={handleChange}
        >
          <option value="TAKING CLIENTS">TAKING CLIENTS</option>
          <option value="NOT TAKING CLIENTS">NOT TAKING CLIENTS</option>
        </select>

        {editingId ? (
          <button onClick={updateTherapist}>Update Therapist</button>
        ) : (
          <button onClick={createTherapist}>Add Therapist</button>
        )}
      </div>

      <h2>Therapist List</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Years</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map((therapist) => (
            <tr key={therapist.therapist_id}>
              <td>{therapist.therapist_id}</td>
              <td>{therapist.title}</td>
              <td>{therapist.name}</td>
              <td>{therapist.email}</td>
              <td>{therapist.location}</td>
              <td>{therapist.years_of_practice}</td>
              <td>{therapist.availability}</td>
              <td>
                <button onClick={() => editTherapist(therapist.therapist_id)}>Edit</button>
                <button onClick={() => deleteTherapist(therapist.therapist_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Therapist;
