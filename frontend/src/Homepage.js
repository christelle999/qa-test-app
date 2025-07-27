// frontend/src/Homepage.js
import React, { useState, useEffect } from 'react';

function Homepage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedItem, setEditedItem] = useState('');

  const apiUrl = 'https://qa-test-app-egya.onrender.com/items';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleAdd = async () => {
    if (!newItem.trim()) return;
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem })
    });
    const data = await res.json();
    setItems(prev => [...prev, data]);
    setNewItem('');
  };

  const handleDelete = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    setItems(items.filter(item => item._id !== id));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedItem(items[index].name);
  };

  const handleSaveEdit = async (id) => {
    const res = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editedItem })
    });
    const data = await res.json();
    const updated = [...items];
    updated[editingIndex] = data;
    setItems(updated);
    setEditingIndex(null);
    setEditedItem('');
  };

  return (
    <div>
      <h2>Welcome to Homepage</h2>
      <input
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        placeholder="Add item"
      />
      <button onClick={handleAdd} disabled={!newItem.trim()}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={item._id}>
            {editingIndex === index ? (
              <>
                <input value={editedItem} onChange={e => setEditedItem(e.target.value)} />
                <button onClick={() => handleSaveEdit(item._id)}>Save</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;


