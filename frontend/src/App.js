import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');
  const [error, setError] = useState('');

  // Fetch items when logged in
  useEffect(() => {
    if (token) {
      axios.get(`${API_URL}/items`)
        .then(res => setItems(res.data))
        .catch(() => setError('Failed to fetch items'));
    }
  }, [token]);

  const handleLogin = () => {
    setError('');
    axios.post(`${API_URL}/login`, { username, password })
      .then(res => {
        setToken(res.data.token);
        setUsername('');
        setPassword('');
      })
      .catch(() => setError('Invalid credentials'));
  };

  const handleAdd = () => {
    if (!newItemName.trim()) return;
    axios.post(`${API_URL}/items`, { name: newItemName }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setItems([...items, res.data]);
        setNewItemName('');
      })
      .catch(() => setError('Failed to add item'));
  };

  const startEdit = (item) => {
    setEditItemId(item.id);
    setEditItemName(item.name);
  };

  const handleEdit = () => {
    axios.put(`${API_URL}/items/${editItemId}`, { name: editItemName }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setItems(items.map(i => i.id === editItemId ? res.data : i));
        setEditItemId(null);
        setEditItemName('');
      })
      .catch(() => setError('Failed to update item'));
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setItems(items.filter(i => i.id !== id));
      })
      .catch(() => setError('Failed to delete item'));
  };

  if (!token) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Login</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br /><br />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br /><br />
        <button onClick={handleLogin}>Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {editItemId === item.id ? (
              <>
                <input
                  value={editItemName}
                  onChange={e => setEditItemName(e.target.value)}
                />
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => setEditItemId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {item.name} 
                <button onClick={() => startEdit(item)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <input
        placeholder="New item name"
        value={newItemName}
        onChange={e => setNewItemName(e.target.value)}
      />
      <button onClick={handleAdd}>Add Item</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
