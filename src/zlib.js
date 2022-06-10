import { createWriteStream, createReadStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { stdout as output } from 'process';

import { dialog } from './dialog.js';

const { getErrorMsg, getInvalidMsg } = dialog;

class Zib {
  compress(filenameToCompress, filenameAfterCompress) {
    if (!filenameToCompress || !filenameAfterCompress) {
      output.write(getInvalidMsg());
      return;
    }
    const readStream = createReadStream(filenameToCompress)
    const writeStream = createWriteStream(filenameAfterCompress);

    const stream = readStream.pipe(createBrotliCompress()).pipe(writeStream);

    stream
      .on('error', getErrorMsg);
  }

  decompress(filenameToDecompress, filenameAfterDecompress) {
    if (!filenameToDecompress || !filenameAfterDecompress) {
      output.write(getInvalidMsg());
      return;
    }
    const readStream = createReadStream(filenameToDecompress);
    const writeStream = createWriteStream(filenameAfterDecompress);

    const stream = readStream.pipe(createBrotliDecompress()).pipe(writeStream);

    stream
      .on('error', getErrorMsg);
  }
}

export const zib = new Zib();