const path = require('path');

const companyRepository = require('../repositories/company');
const addressRepository = require('../repositories/address');
const fileRepository = require('../repositories/file');
const fieldOfActivityService = require('./fieldOfActivity');
const fileService = require('./file');
const error = require('../services/error');
const CrudService = require('./crudService');
const companyFilesFolder = require('../../config.js').companyFilesFolder;

class CompanyService extends CrudService {
  async create(company, files) {
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

    for (const image of files) {
      await fileService.create({
        originalFileName: image.originalname,
        path: path.join(companyFilesFolder, image.originalname),
        entityType: 'company',
        entityId: createdCompany.id,
        localname: image.filename,
      });
    }

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

  async delete(id) {
    await this.get(id);
    await this.repository.delete(id);
    const deleted = await this.repository.getNonParanoid(id);
    const files = await fileRepository.getAllByPropsNonParanoid( { entityId: deleted.id });

    for (const image of files) {
      await fileService.delete(image.id);
    }

    return deleted;
  }
};

module.exports = new CompanyService({
  modelName: 'Company',
  repositoryName: 'company',
});
