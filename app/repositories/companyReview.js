const db = require('../models');
const Repository = require('./crudRepository');

class CompanyReviewRepository extends Repository {
  async getAll(userId, companyId) {
    return db.company_reviews.findAll({ raw: true, where: { userId, companyId } });
  }
};

module.exports = new CompanyReviewRepository('company_reviews');
