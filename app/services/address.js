const CrudService = require('./CrudService');

class AddressService extends CrudService {
  async parseAndCreate(companyId, address) {
    const addressFields = address.split(', ');
    const [ streetName, streetNumber ] = addressFields[0].split(' ');
    const apartmentNumber = addressFields[1].split(' ')[1];
    const city = addressFields[2];
    const country = addressFields[3];

    await this.create({
      streetNumber: Number(streetNumber),
      apartmentNumber: Number(apartmentNumber),
      companyId,
      streetName,
      city,
      country,
    });
  }

  async create(address) {
    await this.validator.validateCreate(address);
    const createdAddress = await this.repository.create(address);

    return createdAddress;
  }

  async update(id, data) {
    await this.validator.validateUpdate(id, data);
    await this.repository.update(id, data);

    return await this.get(id);
  }
};

module.exports = new AddressService({
  repositoryName: 'address',
  modelName: 'Address',
  validatorName: 'address',
});
