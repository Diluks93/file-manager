import { stdout as output, chdir } from 'process';
import { readdir, rm } from 'fs/promises';
import { createReadStream, createWriteStream, rename, unlink } from 'fs';

import { dialog } from './dialog.js';

const { getErrorMsg } = dialog;

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
    try {
      chdir(`./${directory}`);
    } catch (err) {
      getErrorMsg();
    }
  }

  openFile(pathToFile) {
    const stream = createReadStream(pathToFile);
    stream.on('error', getErrorMsg);
    stream.pipe(output);
  };

  createNewFile(pathToFile) {
    const stream = createWriteStream(pathToFile);
    stream.on('error', getErrorMsg);
    stream.close();
  }

  renameFile(oldFilename, newFilename) {
    rename(oldFilename, newFilename, (err) => {
      if (err) {
        if (err.code === 'EXDEV') {
          this.copyFile();
        } else {
          getErrorMsg();
        }
        return;
      }
    });
  }

  copyFile(from, to, isMoved = false) {
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
    try {
      await rm(path);
    } catch (err) {
      getErrorMsg();
    }
  }
}

export const fileSystem = new FileSystem();
