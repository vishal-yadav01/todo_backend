const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDb = require('./configs/dbConnection');
const routes = require('./routes/routes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// ✅ Connect MongoDB once
connectDb();

// ✅ Allow frontend domain + cookies
app.use(
  cors({
    origin: 'https://todo-frontend-3nxt.vercel.app',
    credentials: true,
  })
);

// ✅ Allow preflight requests
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('Todo app working fine ✅');
});

app.use('/api/v1', routes);

// ❌ REMOVE app.listen()
// ✅ Instead export the app for Vercel
module.exports = app;
