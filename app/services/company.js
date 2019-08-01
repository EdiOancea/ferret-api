const path = require('path');

const addressRepository = require('../repositories/address');
const fieldOfActivityRepository = require('../repositories/fieldOfActivity');
const fileRepository = require('../repositories/file');
const companyValidator = require('../validators/company');
const addressService = require('../services/address');
const timetableService = require('./timetable');
const fileService = require('./file');

const error = require('./error');
const CrudService = require('./crudService');
const { COMPANY_FILES_FOLDER, ORIGIN } = require('../../config.js');

class CompanyService extends CrudService {
  async get(id) {
    const company = await this.repository.get(id);
    if (!company) {
      error.throwNotFoundError('Company not found.');
    }

    const { fieldOfActivityId, ...companyToReturn } = company;
    const fieldOfActivity = await fieldOfActivityRepository
      .get(fieldOfActivityId);
    companyToReturn.business = fieldOfActivity.name;

    const companyAddresses = await addressRepository.getAllByProps({
      companyId: id,
    });
    if (companyAddresses && companyAddresses.length) {
      companyToReturn.address = companyAddresses[0];
    }

    const companyFiles = await fileRepository.getAllByProps({
      entityId: id,
      entityType: 'company',
    });
    companyToReturn.images = companyFiles.map(file => ({
      name: file.originalFileName,
      url: `${ORIGIN}companies/${file.originalFileName}`,
    }));

    return companyToReturn;
  }

  async create(company, files) {
    await companyValidator.validateCreate(company);

    const {
      business,
      address,
      timetables,
      ...newCompany
    } = company;
    const fieldOfActivity = await fieldOfActivityRepository.getByPropsNonParanoid({
      name: business,
    });
    newCompany.fieldOfActivityId = fieldOfActivity.id;

    const createdCompany = await this.repository.create(newCompany);

    if (address) {
      await addressService.parseAndCreate(createdCompany.id, String(address));
    }

    if (timetables) {
      for (const timetable of timetables) {
        await timetableService.create({
          ...timetable,
          start: new Date(timetable.start),
          end: new Date(timetable.end),
          companyId: createdCompany.id,
        });
      }
    }
    for (const image of files) {
      await fileService.create({
        originalFileName: image.originalname,
        path: path.join(COMPANY_FILES_FOLDER, image.originalname),
        entityType: 'company',
        entityId: createdCompany.id,
        localname: image.filename,
      });
    }

    return await this.get(createdCompany.id);
  }

  async update(id, data) {
    await companyValidator.validateUpdate(id, data);

    const { business, ...newData } = data;
    if (business !== undefined) {
      const fieldOfActivity = await fieldOfActivityRepository.getByPropsNonParanoid({
        name: business,
      });
      newData.fieldOfActivityId = fieldOfActivity.id;
    }

    await this.repository.update(id, newData);

    return await this.get(id);
  }

  async delete(id) {
    await companyValidator.validateDelete(id);

    await this.repository.delete(id);
    const deleted = await this.repository.getNonParanoid(id);

    await addressRepository.deleteByProps({
      companyId: deleted.id,
    });

    const files = await fileRepository.getAllByProps({
      entityId: deleted.id,
    });
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
