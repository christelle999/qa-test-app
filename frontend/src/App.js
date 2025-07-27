import React, { useState, useEffect } from 'react';

function Homepage() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    // Fetch items from backend when component mounts
    fetch('https://qa-test-app-egya.onrender.com/items')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(console.error);
  }, []);

  const handleAddItem = () => {
    if (!itemName.trim()) return;

    fetch('https://qa-test-app-egya.onrender.com/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: itemName }),
    })
      .then(res => res.json())
      .then(newItem => {
        setItems(prev => [...prev, newItem]);
        setItemName('');
      })
      .catch(console.error);
  };

  return (
    <div>
      <h2>Welcome to Homepage</h2>

      <input
        placeholder="New item name"
        value={itemName}
        onChange={e => setItemName(e.target.value)}
      />
      <button onClick={handleAddItem} disabled={!itemName.trim()}>
        Add Item
      </button>

      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Homepage;
