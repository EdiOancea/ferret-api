const companyReviewService = require('../services/companyReview');

class CompanyReviewController {
  async create(req, res, next) {
    res.json(await companyReviewService.create(req.user, Number(req.params.companyId), req.body));
  }

  async get(req, res, next) {
    res.json(await companyReviewService.get(Number(req.params.reviewId)));
  }

  async getAll(req, res, next) {
    res.json(await companyReviewService.getAll(req.user, Number(req.params.companyId)));
  }
};

module.exports = new CompanyReviewController();
