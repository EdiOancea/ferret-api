const express = require('express');

const companyReviewController = require('../controllers/companyReview');
const wrapError = require('../services/wrapError');

const companyReviewRouter = express.Router();

companyReviewRouter.route('/companies/:companyId/reviews')
  .post(wrapError(companyReviewController.create))
  .get(wrapError(companyReviewController.getAll));

companyReviewRouter.route('/companies/:companyId/reviews/:reviewId')
  .get(wrapError(companyReviewController.get));

module.exports = companyReviewRouter;
