const db = require('../models');

class AddressRepository {
  getByAddress(address) {
    return db.addresses.findOne({
      where: { ...address },
      paranoid: false,
    });
  }

  get(id) {
    return db.addresses.findOne({ where: { id } });
  }

  getNonParanoid(id) {
    return db.addresses.findOne({
      where: { id },
      paranoid: false,
    });
  }

  create(newAddress) {
    return db.addresses.create(newAddress);
  }

  delete(id) {
    return db.addresses.destroy({ where: { id } });
  }

  update(id, newAddressData) {
    return db.addresses.update(newAddressData, {
      where: {
        id,
        deletedAt: null,
      },
      individualHooks: true,
    });
  }
};

module.exports = new AddressRepository();
