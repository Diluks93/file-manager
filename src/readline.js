import { stdin as input, stdout as output } from 'process';
import { createInterface } from 'readline';
import { homedir } from 'os';

import { getFarewell, getNamePathDirectory } from './dialog.js';

export const readline = (username) => {
  const rl = createInterface({ input, output });

  process.chdir(homedir());
  output.write(getNamePathDirectory(process.cwd()) + '\n');

  rl.on('line', line => {
    checkInput(line);
  });

  rl.on('SIGINT', () => {
    output.write(getFarewell(username));
    rl.close();
  });

  const checkInput = (line) => {
    switch(line) {
      case '.exit':
        output.write(getFarewell(username));
        rl.close();
        break;
      case 'up':
      case '..':
        process.chdir('..');
        output.write(getNamePathDirectory(process.cwd()) + '\n');
        break;
      case 'cd':
        console.log('cd');
        break;
      case 'ls':
        console.log('ls');
        break;
      case 'cat':
        console.log('cat');
        break;
      case 'add':
        console.log('add');
        break;
      case 'rn':
        console.log('rn');
        break;
      case 'cp':
        console.log('cp');
        break;
      case 'mv':
        console.log('mv');
        break;
      case 'rm':
        console.log('rm');
        break;
      case 'os --EOL':
        console.log('os --EOL');
        break;
      case 'os --cpus':
        console.log('os --cpus');
        break;
      case 'os --homedir':
        console.log('os --homedir');
        break;
      case 'os --username':
        console.log('os --username');
        break;
      case 'os --architecture':
        console.log('os --architecture');
        break;
      case 'hash':
        console.log('hash');
        break;
      case 'compress':
        console.log('compress');
        break;
      case 'decompress':
        console.log('decompress');
        break;
      case 'help':
        console.log('help');
        break;
      default:
        output.write(getInvalidMsg());
        break;
    }
  }
}