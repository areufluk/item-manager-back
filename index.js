const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 3000;

//set middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false}));

//set route
app.use('/import', require('./routes/import'));

app.listen(PORT, () => console.log(`running server at port ${PORT}`));

