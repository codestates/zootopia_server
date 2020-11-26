const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  morgan('dev'),
  cors({
    origin: true,
    credentials: true,
  }),
);

// Routing
app.get('/', (req, res) => {
  res.status(200).send('server on');
});
app.use('/user', require('./routes/user'));
app.use('/auth', require('./routes/auth'));
app.use('/post', require('./routes/post'));

// Serve
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
