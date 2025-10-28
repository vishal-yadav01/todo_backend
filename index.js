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
// ✅ Dynamic CORS Setup
// -----------------------------
const allowedOrigins = [
  'https://todo-frontend-3nxt.vercel.app', // your live frontend
  'http://localhost:3000', // local dev
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Preflight support
app.options(/.*/, cors());

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
