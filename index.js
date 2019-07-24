const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const userRouter = require('./app/routes/user');
const addressRouter = require('./app/routes/address');
const signinRouter = require('./app/routes/signin');
const fieldOfActivityRouter = require('./app/routes/fieldOfActivity');
const companyRouter = require('./app/routes/company');
const appointmentRouter = require('./app/routes/appointment');
const sequelizeErrorParser = require('./app/services/sequelizeErrorParser');

const port = process.env.PORT;
const app = express();
const upload = multer({ dest: './tmp' });

app.use(bodyParser.json());
app.use(cors());
app.use(upload.array('images'));

app.use('/api', addressRouter);
app.use('/api', userRouter);
app.use('/api', fieldOfActivityRouter);
app.use('/api', companyRouter);
app.use('/api', signinRouter);
app.use('/api', appointmentRouter);

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
