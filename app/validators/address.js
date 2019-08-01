const companyRepository = require('../repositories/company');
const addressRepository = require('../repositories/address');
const error = require('../services/error');

class AddressValidator {
  async validateCreate(address) {
    if (address.id || address.companyId === undefined) {
      error.throwValidationError('Invalid address format.');
    }

    const existingAddress = await addressRepository.getByPropsNonParanoid(address);
    if (existingAddress) {
      error.throwValidationError('Address already exists.');
    }

    await this.validateCompany(address, 'create');
  }

  async validateUpdate(id, data) {
    if (data.id !== undefined) {
      error.throwValidationError('You can not change the id.');
    }

    const existingAddress = await addressRepository.get(id);
    if (!existingAddress) {
      error.throwNotFoundError('Address not found.');
    }

    await this.validateCompany(data, 'update');
  }

  async validateCompany(address, operation) {
    if (address.companyId !== undefined) {
      const company = await companyRepository.get(address.companyId);
      if (!company) {
        error.throwNotFoundError('Company not found.');
      }
    } else {
      if (operation === 'create') {
        error.throwValidationError('Invalid address format.');
      }
    }
  }
};

module.exports = new AddressValidator();
