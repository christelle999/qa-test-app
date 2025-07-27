// backend/index.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Sample in-memory data
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
];

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'pass') {
    return res.json({ success: true, token: "fake-jwt-token" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.name = req.body.name;
  res.json(item);
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
