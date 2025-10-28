// const express = require('express');
// const app = express();
// const cors = require('cors');
// const dotenv = require('dotenv');
// const cookieParser = require('cookie-parser');
// const connectDb = require('./configs/dbConnection');
// const routes = require('./routes/routes');
// dotenv.config();
// app.use(express.json());
// app.use(cookieParser());

// app.set('trust proxy', 1);
// connectDb();
// app.use(
//   cors({
//     origin: 'https://todo-frontend-vk1e.vercel.app',
//     credentials: true,
//   })
// );

// app.get('/', (req, res) => {
//   return res.send('Todo app work');
// });

// app.use('/api/v1', routes);

// const PORT = 4000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDb = require('./configs/dbConnection');
const routes = require('./routes/routes');

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', 1); // ✅ Required for cookies to work on Vercel

connectDb();

// ✅ CORS Setup (most important part)
const FRONTEND_URL = 'https://todo-frontend-vk1e.vercel.app';

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Handle preflight requests explicitly (fixes OPTIONS CORS error)
app.options(
  '*',
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ✅ Optional: add manual CORS headers for extra safety
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  return res.send('Todo app working ✅');
});

app.use('/api/v1', routes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
