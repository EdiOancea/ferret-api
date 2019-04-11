const signinController = require('../controllers/signin');
const express = require('express');

const wrapError = require('../services/wrapError');
const signinRouter = express.Router();

signinRouter.route('/signin')
  .post(wrapError(signinController.authenticate));

module.exports = signinRouter;
