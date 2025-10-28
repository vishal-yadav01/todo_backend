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

connectDb();
app.use(
  cors({
    origin: 'https://todo-frontend-vk1e.vercel.app/login',
    credentials: true,
  })
);

app.get('/', (req, res) => {
  return res.send('Todo app work');
});

app.use('/api/v1', routes);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
