const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require('./config/db');

dotenv.config();
connectdb();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routers/authRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));