import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import { dialog } from './dialog.js';

const { getErrorMsg } = dialog;

class CalcHash {
  calculateHash (pathToFilename) {
    const hash = createHash('sha256');
    createReadStream(pathToFilename)
      .on('data', data => hash.update(data))
      .on('error', getErrorMsg)
      .on('end', () => process.stdout.write(hash.digest('hex')+ '\n'));
  };
}

export const calcHash = new CalcHash();
