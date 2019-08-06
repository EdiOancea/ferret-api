const companyRepository = require('../repositories/company');
const error = require('../services/error');
const Validator = require('./crudValidator');

class CompanyReviewValidator extends Validator {
  async validateCreate(companyReview, user, companyId) {
    if (companyReview.id || !companyId || !user) {
      error.throwValidationError('Invalid company review format.');
    }

    const existingCompanyReview = await this.repository.getByPropsNonParanoid(companyReview);
    if (existingCompanyReview) {
      error.throwValidationError('Company review already exists.');
    }
    
    if (companyReview.companyId !== undefined) {
      const company = await companyRepository.get(companyReview.companyId);
      if (!company) {
        error.throwNotFoundError('Company not found.');
      }
    } else {
      error.throwValidationError('Invalid company review format.');
    }
  }

  async validateGetAll(user, companyId) {
    if (!user || !companyId) {
      error.throwValidationError('Invalid company review format.');
    }
  }
};

module.exports = new CompanyReviewValidator({
  modelName: 'CompanyReview',
  repositoryName: 'companyReview',
});
