const express = require('express');
const wrapError = require('../services/wrapError');

module.exports = (name, route) => {
  const controller = require(`../controllers/${name}`);
  const router = express.Router();

  router.route(`/${route}`)
    .post(wrapError(controller.create.bind(controller)));

  router.route(`/${route}/:id`)
    .delete(wrapError(controller.delete.bind(controller)))
    .put(wrapError(controller.update.bind(controller)))
    .get(wrapError(controller.get.bind(controller)));

  return router;
};
