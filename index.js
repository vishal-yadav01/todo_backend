// -----------------------------
// ✅ Imports
// -----------------------------
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDb = require('./configs/dbConnection');
const routes = require('./routes/routes');

// -----------------------------
// ✅ Initialization
// -----------------------------
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

// -----------------------------
// ✅ Database Connection
// -----------------------------
connectDb();

// -----------------------------
// ✅ CORS Configuration (Allow All)
// -----------------------------
// This allows any frontend to call your backend safely
app.use(
  cors({
    origin: '*', // allow requests from any domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Optional preflight support
app.options(/.*/, cors());

// -----------------------------
// ✅ Test Route
// -----------------------------
app.get('/', (req, res) => {
  res.send('Todo backend working fine ✅');
});

// -----------------------------
// ✅ API Routes
// -----------------------------
app.use('/api/v1', routes);

// -----------------------------
// ✅ Server Listen
// -----------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
