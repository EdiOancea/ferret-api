const addressRepository = require('../repositories/address');
const error = require('../services/error');
const sequelizeErrorParser = require('./sequelizeErrorParser');

class AddressService {
  async get(id) {
    let foundAddress = await addressRepository.get(id);
    if (!foundAddress) {
      error.throwNotFoundError('Address not found.');
    }

    return foundAddress;
  }

  async create(address) {
    if (address.id) {
      error.throwValidationError('Invalid address format.');
    }

    const addressExists = await addressRepository.getByAddress(address);
    if (addressExists) {
      error.throwValidationError('Address already exists.');
    }

    const createdAddress = await addressRepository.create(address);

    return await this.get(createdAddress.id);
  }

  async delete(id) {
    await this.get(id);
    await addressRepository.delete(id);
    const deletedAddress =  await addressRepository.getNonParanoid(id);

    return deletedAddress;
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

module.exports = new AddressService();
