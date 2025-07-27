const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/login', authRoutes);
app.use('/items', itemsRoutes);

app.listen(port, () => {
  console.log(`Backend API listening at http://localhost:${port}`);
});
