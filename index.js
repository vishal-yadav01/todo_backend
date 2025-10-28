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
// ✅ CORS Configuration
// -----------------------------
app.use(
  cors({
    origin: 'https://todo-frontend-3nxt.vercel.app', // your deployed frontend
    credentials: true,
  })
);

// ❌ Remove old app.options('*', cors()) line
// Express 5 no longer supports '*' wildcard here
// ✅ Optional: modern wildcard if you want explicit preflight support
app.options(/.*/, cors());

// -----------------------------
// ✅ Test Route
// -----------------------------
app.get('/', (req, res) => {
  res.send('Todo app working ✅');
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
