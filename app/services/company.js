const companyRepository = require('../repositories/company');
const addressRepository = require('../repositories/address');
const fieldOfActivityService = require('./fieldOfActivity');
const error = require('../services/error');
const CrudService = require('./crudService');

class CompanyService extends CrudService {
  async create(company) {
    if (company.id !== undefined) {
      error.throwValidationError('Invalid company format.');
    }

    const companyExists = await companyRepository.getByPropsNonParanoid({ name: company.name });
    if (companyExists) {
      error.throwValidationError('Company already exists.');
    }

    if (company.fieldOfActivityId !== undefined) {
      const fieldExists = await fieldOfActivityService.get(company.fieldOfActivityId);
    } else {
      error.throwValidationError('Invalid company format.');
    }

    const createdCompany = await companyRepository.create(company);

    return await this.get(createdCompany.id);
  }

  async update(id, newData) {
    if (newData.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    if (newData.name !== undefined) {
      error.throwValidationError('You can not change the company name.');
    }

    if (newData.fieldOfActivityId !== undefined) {
      const fieldExists = await fieldOfActivityService.get(newData.fieldOfActivityId);
    }

    await this.get(id);
    await companyRepository.update(id, newData);

    return await this.get(id);
  }
};

module.exports = new CompanyService({
  modelName: 'Company',
  repositoryName: 'company',
});
