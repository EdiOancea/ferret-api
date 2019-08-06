const fieldOfActivityRepository = require('../repositories/fieldOfActivity');
const error = require('../services/error');
const CrudValidator = require('./CrudValidator');

class CompanyValidator extends CrudValidator {
  async validateCreate(company) {
    if (company.id !== undefined) {
      error.throwValidationError('Invalid company format.');
    }

    const existingCompany = await this.repository.getByPropsNonParanoid({
      name: company.name,
    });
    if (existingCompany) {
      error.throwValidationError('Company already exists.');
    }

    await this.validateFieldOfActivity(company, 'create');
  }

  async validateUpdate(id, data) {
    if (data.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    if (data.name !== undefined) {
      error.throwValidationError('You can not change the company name.');
    }

    const existingCompany = await this.repository.get(id);
    if (!existingCompany) {
      error.throwNotFoundError('Company not found.');
    }

    await this.validateFieldOfActivity(data, 'update');
  }

  async validateFieldOfActivity(company, operation) {
    if (company.business !== undefined) {
      const fieldOfActivity = await fieldOfActivityRepository.getByPropsNonParanoid({
        name: company.business,
      });
      if (!fieldOfActivity) {
        error.throwNotFoundError('Field of activity not found.');
      }
    } else {
      if (operation === 'create') {
        error.throwValidationError('Invalid company format.');
      }
    }
  }
};

module.exports = new CompanyValidator({
  repositoryName: 'company',
  modelName: 'Company',
});
