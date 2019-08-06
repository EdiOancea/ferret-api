const CrudService = require('./CrudService');

class CompanyReviewService extends CrudService {
  async create(user, companyId, data) {
    const companyReview = {
      ...data,
      companyId,
      userId: user.id,
    };

    await this.validator.validateCreate(companyReview, user, companyId);
    const createdCompanyReview = await this.repository.create(companyReview);

    return createdCompanyReview;
  }

  async getAll(user, companyId) {
    await this.validator.validateGetAll(user, companyId);
    const companyReview = await this.repository.getAll(user.id, companyId);

    return companyReview;
  }
};

module.exports = new CompanyReviewService({
  modelName: 'CompanyReview',
  repositoryName: 'companyReview',
  validatorName: 'companyReview',
});
