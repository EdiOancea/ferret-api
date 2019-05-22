const CrudService = require('./CrudService');
const companyService = require('./company');
const addressRepository = require('../repositories/address');
const error = require('./error');

class AddressService extends CrudService {
  async create(address) {
    if (address.id || address.companyId === undefined) {
      error.throwValidationError('Invalid address format.');
    }

    const addressExists = await addressRepository.getByPropsNonParanoid(address);
    if (addressExists) {
      error.throwValidationError('Address already exists.');
    }

    await companyService.get(address.companyId);
    const createdAddress = await addressRepository.create(address);

    return await this.get(createdAddress.id);
  }

  async update(id, newData) {
    if (newData.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    await this.get(id);
    await addressRepository.update(id, newData);

    return await this.get(id);
  }
};

module.exports = new AddressService({
  repositoryName: 'address',
  modelName: 'Address',
});
