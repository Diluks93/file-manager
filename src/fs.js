import { stdout as output, chdir } from 'process';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readdir } from 'fs/promises';

import { dialog } from './dialog.js';

const { getErrorMsg } = dialog;

class FileSystem {
  constructor() {
    //this.__dirname = dirname(fileURLToPath(import.meta.url));
  }

  async list(directory) {
    try {
      const files = await readdir( directory);
      files.forEach(file => {
        const filename = `${file}\n`;
        output.write(filename);
      });
    } catch (err) {
      output.write(getErrorMsg());
    }
  }

  changeDirectory(directory) {
    try {
      chdir(`./${directory}`);
    } catch (err) {
      output.write(getErrorMsg());
    }
  }
}

export const fileSystem = new FileSystem();
