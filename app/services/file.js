const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const CrudService = require('./CrudService');
const fileRepository = require('../repositories/file');
const error = require('./error');
const { TMP_FOLDER } = require('../../config.js');

class FileService extends CrudService {
  async create(file) {
    if (!file.path || file.id) {
      error.throwValidationError('Invalid file format.');
    }

    const { localname, ...newFile } = file;
    const createdFile = await fileRepository.create(newFile);

    const renameAsync = promisify(fs.rename);
    await renameAsync(path.join(TMP_FOLDER, localname), createdFile.path);

    return await this.get(createdFile.id);
  }

  async update(id, newData) {
    const { originalFileName, ...restData } = newData;
    if (restData !== undefined) {
      error.throwValidationError('You can only change the original file name.');
    }

    await this.get(id);
    await fileRepository.update(id, newData);

    return await this.get(id);
  }

  async delete(id) {
    await this.get(id);
    await this.repository.delete(id);

    const deleted = await this.repository.getNonParanoid(id);
    fs.unlinkSync(deleted.path);

    return deleted;
  }
};

module.exports = new FileService({
  repositoryName: 'file',
  modelName: 'File',
});
