const path = require('path');

const companyFilesFolder = require('../../config.js').companyFilesFolder;
const addressRepository = require('../repositories/address');
const fieldOfActivityRepository = require('../repositories/fieldOfActivity');
const fileRepository = require('../repositories/file');
const timetableService = require('./timetable');
const fileService = require('./file');

const error = require('./error');
const CrudService = require('./crudService');

class CompanyService extends CrudService {
  async create(company, files) {
    if (company.id !== undefined) {
      error.throwValidationError('Invalid company format.');
    }

    const companyExists = await this.repository.getByPropsNonParanoid({ name: company.name });
    if (companyExists) {
      error.throwValidationError('Company already exists.');
    }

    const {
      business,
      timetables,
      ...newCompany
    } = company;
    if (business !== undefined) {
      const fieldOfActivity = await fieldOfActivityRepository.getByPropsNonParanoid({ name: business });
      if (!fieldOfActivity) {
        error.throwNotFoundError('Field of activity not found.');
      }
      newCompany.fieldOfActivityId = fieldOfActivity.id;
    } else {
      error.throwValidationError('Invalid company format.');
    }

    const createdCompany = await this.repository.create(newCompany);

    for (const timetable of timetables) {
      await timetableService.create({
        ...timetable,
        start: new Date(timetable.start),
        end: new Date(timetable.end),
        companyId: createdCompany.id,
      });
    }

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

  async update(id, data) {
    if (data.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    if (data.name !== undefined) {
      error.throwValidationError('You can not change the company name.');
    }

    const { business, ...newData } = data;
    if (business !== undefined) {
      const fieldOfActivity = await fieldOfActivityRepository.getByPropsNonParanoid({ name: business });
      if (!fieldOfActivity) {
        error.throwNotFoundError('Field of activity not found.');
      }
      newData.fieldOfActivityId = fieldOfActivity.id;
    }

    await this.get(id);
    await this.repository.update(id, newData);

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
