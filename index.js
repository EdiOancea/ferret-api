const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./app/routes/user');
const signinRouter = require('./app/routes/signin');
const sequelizeErrorParser = require('./app/services/sequelizeErrorParser');
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', userRouter);
app.use('/api', signinRouter);

app.use((err, req, res, next) => {
  const sequelizeErrors = sequelizeErrorParser(err);
  if (sequelizeErrors) {
    res.status(422).json(sequelizeErrors);
  }

  res.status(err.status ? err.status : 500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`Works on port ${port}`);
});

module.exports = app;
