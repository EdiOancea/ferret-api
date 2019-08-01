const fieldOfActivityRepository = require('../repositories/fieldOfActivity');
const companyRepository = require('../repositories/company');
const error = require('../services/error');

class CompanyValidator {
  async validateCreate(company) {
    if (company.id !== undefined) {
      error.throwValidationError('Invalid company format.');
    }

    const existingCompany = await companyRepository.getByPropsNonParanoid({
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

    const existingCompany = await companyRepository.get(id);
    if (!existingCompany) {
      error.throwNotFoundError('Company not found.');
    }

    await this.validateFieldOfActivity(data, 'update');
  }

  async validateDelete(id) {
    const existingCompany = await companyRepository.get(id);
    if (!existingCompany) {
      error.throwNotFoundError('Company not found.');
    }
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

module.exports = new CompanyValidator();
