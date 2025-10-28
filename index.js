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

// -----------------------------
// ✅ Middlewares
// -----------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -----------------------------
// ✅ Universal CORS (Render Safe)
// -----------------------------
app.use(
  cors({
    origin: true, // allows all origins dynamically
    credentials: true, // allow cookies / auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-csrf-token',
      'X-Requested-With',
      'Accept',
      'Origin',
    ],
    exposedHeaders: ['set-cookie', 'Authorization'],
  })
);

// -----------------------------
// ✅ Database Connection
// -----------------------------
connectDb();

// -----------------------------
// ✅ Base Route
// -----------------------------
app.get('/', (req, res) => {
  res.send('Todo backend running ✅');
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
