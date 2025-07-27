// backend/routes/items.js
const express = require('express');
const router = express.Router();

let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" }
];

router.get('/', (req, res) => {
  res.json(items);
});

router.post('/', (req, res) => {
  const newItem = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.name = req.body.name;
  res.json(item);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.status(204).send();
});

module.exports = router;
