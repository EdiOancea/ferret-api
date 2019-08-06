const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const CrudService = require('./CrudService');
const { TMP_FOLDER } = require('../../config.js');

class FileService extends CrudService {
  async create(file) {
    await this.validator.validateCreate(file);

    const { localname, ...newFile } = file;
    const createdFile = await this.repository.create(newFile);

    const renameAsync = promisify(fs.rename);
    await renameAsync(path.join(TMP_FOLDER, localname), createdFile.path);

    return createdFile;
  }

  async update(id, data) {
    await this.validator.validateUpdate(id, data);
    await this.repository.update(id, data);

    return await this.get(id);
  }

  async delete(id) {
    await this.validator.validateDelete(id);
    await this.repository.delete(id);

    const deleted = await this.repository.getNonParanoid(id);
    fs.unlinkSync(deleted.path);

    return deleted;
  }
};

module.exports = new FileService({
  repositoryName: 'file',
  modelName: 'File',
  validatorName: 'file',
});
