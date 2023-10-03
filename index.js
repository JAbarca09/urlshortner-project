require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const urlShortnerRoutes = require('./urlShortnerRoutes');
const data = require('./data');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

data.readData((err, urlData) => {
  if (err) {
    console.error('Error reading data:', err);
  } else {
    console.log(urlData);
  }
});

app.use('/api', urlShortnerRoutes);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
