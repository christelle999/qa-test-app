import React, { useState, useEffect } from 'react';

function Homepage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  // Fetch items on load
  useEffect(() => {
    fetch('https://qa-test-app-egya.onrender.com/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  const handleAdd = () => {
    if (!newItem.trim()) return;
    fetch('https://qa-test-app-egya.onrender.com/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newItem })
    })
      .then(res => res.json())
      .then(item => setItems([...items, item]))
      .finally(() => setNewItem(''));
  };

  const handleDelete = (id) => {
    fetch(`https://qa-test-app-egya.onrender.com/items/${id}`, { method: 'DELETE' })
      .then(() => setItems(items.filter(item => item.id !== id)));
  };

  const handleEdit = (id) => {
    if (!editText.trim()) return;
    fetch(`https://qa-test-app-egya.onrender.com/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editText })
    })
      .then(res => res.json())
      .then(updated => {
        setItems(items.map(item => (item.id === id ? updated : item)));
        setEditIndex(null);
        setEditText('');
      });
  };

  return (
    <div>
      <h2>Welcome to Homepage</h2>
      <input
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
        placeholder="Enter new item"
      />
      <button onClick={handleAdd} disabled={!newItem.trim()}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            {editIndex === index ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button onClick={() => handleEdit(item.id)} disabled={!editText.trim()}>Save</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => {
                  setEditIndex(index);
                  setEditText(item.name);
                }}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
