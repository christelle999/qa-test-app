const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { username, password } = req.body;
  if (username === 'user' && password === 'pass') {
    return res.json({ success: true, token: "fake-jwt-token" });
  }
  res.status(401).json({ success: false, message: "Invalid credentials" });
});

module.exports = router;
