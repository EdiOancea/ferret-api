const addressController = require('../controllers/address');
const express = require('express');

const wrapError = require('../services/wrapError');
const addressRouter = express.Router();

addressRouter.route('/addresses')
  .post(wrapError(addressController.create));

addressRouter.route('/addresses/:id')
  .delete(wrapError(addressController.delete))
  .put(wrapError(addressController.update))
  .get(wrapError(addressController.get));

module.exports = addressRouter;
