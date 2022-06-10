import { stdout as output } from 'process';
import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { EOL } from 'os';

import { dialog } from './dialog.js';

const { getErrorMsg, getInvalidMsg } = dialog;

class CalcHash {
  async calculateHash (pathToFilename) {
    if (!pathToFilename) {
      output.write(getInvalidMsg());
      return;
    }
    const hash = createHash('sha256');
    const fd = createReadStream(pathToFilename);

    const stream = new Promise((resolve) => {
      fd.on('data', (chunk) => {
        hash.update(chunk);
      });
      fd.on('end', () => {
        output.write(hash.digest('hex') + EOL);
        resolve();
      });
      fd.on('error', () => {
        getErrorMsg();
        resolve();
      });
    });
    await stream;
  };
}

export const calcHash = new CalcHash();
