const CrudService = require('../services/CrudService');
const addressRepository = require('../repositories/address');
const error = require('../services/error');

class AddressService extends CrudService {
  async create(address) {
    if (address.id) {
      error.throwValidationError('Invalid address format.');
    }

    const addressExists = await addressRepository.getByPropsNonParanoid(address);
    if (addressExists) {
      error.throwValidationError('Address already exists.');
    }

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
