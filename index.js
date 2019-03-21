const express = require('express');
const db = require('./app/models/index');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Works on port ${port}`);
});
