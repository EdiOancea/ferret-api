const companyService = require('./company');
const userService = require('./user');
const companyReviewRepository = require('../repositories/companyReview');
const error = require('./error');

class CompanyReviewService {
  async create(user, companyId, data) {
    const companyReview = {
      ...data,
      userId: user.id,
      companyId,
    };

    if (companyReview.id || !companyId || !user) {
      error.throwValidationError('Invalid company review format.');
    }

    const companyReviewExists = await companyReviewRepository.getByPropsNonParanoid(companyReview);
    if (companyReviewExists) {
      error.throwValidationError('Company review already exists.');
    }

    await companyService.get(companyId);
    const createdCompanyReview = await companyReviewRepository.create(companyReview);

    return await this.get(createdCompanyReview.id);
  }

  async get(id) {
    let found = await companyReviewRepository.get(id);
    if (!found) {
      error.throwNotFoundError('Company review not found.');
    }

    return found;
  }

  async getAll(user, companyId) {
    if (!user || !companyId) {
      error.throwValidationError('Invalid company review format.');
    }
    let found = await companyReviewRepository.getAll(user.id, companyId);

    return found;
  }
};

module.exports = new CompanyReviewService();
