const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.set('port', process.env.PORT);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(app.get('port'), ()=> {
    console.log('app is listen on', app.get('port'))
})