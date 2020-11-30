const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const jwtUtility = require('./utilities/jwt');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  cookieParser(),
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

app.use('/auth', require('./routes/auth'));
app.use((req, res, next) => {
  // 로그인 이외 요청은, 토큰이 담긴 상태여야 하므로 여기서 토큰 검사
  jwtUtility.verifyTokenId(req, res, next);
});
app.use('/user', require('./routes/user'));
app.use('/post', require('./routes/post'));

// 404 Not Found
app.use((req, res, next) => {
  res.status(404).send('ERROR::: 404 Not Found');
});

// Serve
app.listen(PORT, () => console.log(`Server running on PORT: ${PORT}`));
