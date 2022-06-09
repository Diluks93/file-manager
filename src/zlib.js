import { createWriteStream, createReadStream } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { dialog } from './dialog.js';

const { getErrorMsg } = dialog;

class Zib {
  compress(filenameToCompress, filenameAfterCompress) {
    const readStream = createReadStream(filenameToCompress)
    const writeStream = createWriteStream(filenameAfterCompress);

    const stream = readStream.pipe(createBrotliCompress()).pipe(writeStream);

    stream
      .on('finish', () => {
        console.log('Done compressing 😎');
      })
      .on('error', getErrorMsg);
  }

  decompress(filenameToDecompress, filenameAfterDecompress) {
    const readStream = createReadStream(filenameToDecompress);
    const writeStream = createWriteStream(filenameAfterDecompress);

    const stream = readStream.pipe(createBrotliDecompress()).pipe(writeStream);

    stream
      .on('finish', () => {
        console.log('Done decompressing 😎');
      })
      .on('error', getErrorMsg);
  }
}

export const zib = new Zib();