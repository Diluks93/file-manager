import { createReadStream, createWriteStream, unlink, rename } from 'fs';
import { stdout as output, chdir } from 'process';
import { readdir, rm, stat } from 'fs/promises';
import { join } from 'path';

import { dialog } from './dialog.js';

const { getErrorMsg, getInvalidMsg } = dialog;

class FileSystem {
  async showIntoDirectory(directory) {
    try {
      const files = await readdir( directory);
      files.forEach(file => {
        const filename = `${file}\n`;
        output.write(filename);
      });
    } catch (err) {
      getErrorMsg();
    }
  }

  changeDirectory(directory) {
    if (!directory) {
      output.write(getInvalidMsg());
      return;
    }
    try {
      chdir(`./${directory}`);
    } catch (err) {
      getErrorMsg();
    }
  }

  async openFile(pathToFile) {
    if (!pathToFile) {
      output.write(getInvalidMsg());
      return;
    }
    const fd = createReadStream(pathToFile);
    const stream = new Promise((resolve) => {
      fd.on('data', (chunk) => {
        output.write(chunk);
      });
      fd.on('end', () => {
        output.write('\n');
        resolve();
      });
      fd.on('error', () => {
        getErrorMsg();
        resolve();
      });
    })
    await stream;
  };

  createNewFile(pathToFile) {
    if (!pathToFile) {
      output.write(getInvalidMsg());
      return;
    }
    const stream = createWriteStream(pathToFile);
    stream.on('error', getErrorMsg);
    stream.close();
  }

  renameFile(oldFilename, newFilename) {
    if (!oldFilename || !newFilename) {
      output.write(getInvalidMsg());
      return;
    }
    rename(oldFilename, newFilename, (err) => {
      if (err) {
        getErrorMsg();
      }
    });
  }

  async copyFile(from, to, isMoved = false) {
    if (!from || !to) {
      output.write(getInvalidMsg());
      return;
    }
    if ((await stat(to)).isDirectory()) {
      to = join(to, from);
    } else {
      getErrorMsg();
      return;
    }
    const readStream  = createReadStream(from);
    const writeStream = createWriteStream(to);

    readStream.on('error', getErrorMsg);
    writeStream.on('error', getErrorMsg);

    if (isMoved) {
      readStream.on('close', () => {
        unlink(from, (err) => {
          if (err) {
            getErrorMsg();
          }
        });
      });
    };
    readStream.pipe(writeStream);
  }

  async remove(path) {
    if (!path) {
      output.write(getInvalidMsg());
      return;
    }
    try {
      await rm(path);
    } catch (err) {
      getErrorMsg();
    }
  }
}

export const fileSystem = new FileSystem();
