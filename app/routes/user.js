const userController = require('../controllers/user');
const express = require('express');

const wrapError = require('../services/wrapError');
const userRouter = express.Router();

userRouter.route('/users')
  .post(wrapError(userController.createUser))

userRouter.route('/users/:id')
  .delete(wrapError(userController.deleteUser))
  .put(wrapError(userController.updateUser))
  .get(wrapError(userController.getUser));

module.exports = userRouter;
