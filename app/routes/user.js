const userController = require('../controllers/user');
const express = require('express');

const wrapError = require('../services/wrapError');
const userRouter = express.Router();

userRouter.route('/users')
  .post(wrapError(userController.create));

userRouter.route('/users/:id')
  .delete(wrapError(userController.delete))
  .put(wrapError(userController.update))
  .get(wrapError(userController.get));

module.exports = userRouter;
