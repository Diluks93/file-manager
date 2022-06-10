import { stdin as input, stdout as output, chdir, cwd } from 'process';
import { createInterface } from 'readline';
import { homedir, EOL } from 'os';

import { operationSystem }from  './os.js';
import { fileSystem } from './fs.js';
import { calcHash } from './calc-hash.js';
import { showHelp } from './help.js';
import { dialog } from './dialog.js';
import { zib } from './zlib.js';

const { getFarewell, getNamePathDirectory, getInvalidMsg } = dialog;
const { showIntoDirectory, changeDirectory, createNewFile, openFile, renameFile, copyFile, remove } = fileSystem;
const { showEndOfLine, getCpusCount, getCpusModel, getHomedir, getUsername, getArchitecture } = operationSystem;
const { compress, decompress } = zib;
const { showInfo } = showHelp;
const { calculateHash } = calcHash;

export const readline = (username) => {
  const rl = createInterface({ input, output });

  chdir(homedir());
  output.write(getNamePathDirectory(cwd()) + EOL);

  rl.on('line', async (line) => {
    if(line === '.exit') {
      output.write(getFarewell(username));
      rl.close();
      return;
    }
    checkInput(line).then(() => {
      output.write(getNamePathDirectory(cwd()) + EOL);
    })
  });

  rl.on('SIGINT', () => {
    output.write(getFarewell(username));
    rl.close();
  });

  const checkInput = async (line) => {
    const [command, ...args] = line.split(' ');
    switch(command) {
      case 'up':
      case '..':
        chdir('..');
        break;
      case 'cd':
        changeDirectory(args[0]);
        break;
      case 'ls':
        await showIntoDirectory(`${cwd()}`);
        break;
      case 'cat':
        await openFile(args[0]);
        break;
      case 'add':
        createNewFile(args[0]);
        break;
      case 'rn':
        renameFile(args[0], args[1]);
        break;
      case 'cp':
        copyFile(args[0], args[1]);
        break;
      case 'mv':
        copyFile(args[0], args[1], true);
        break;
      case 'rm':
        remove(args[0]);
        break;
      case 'os':
        switch (args[0]) {
          case '--EOL':
            showEndOfLine();
            break;
          case '--cpus':
            getCpusCount();
            getCpusModel();
            break;
          case '--homedir':
            getHomedir();
            break;
          case '--username':
            getUsername();
            break;
          case '--architecture':
          case '--arch':
            getArchitecture();
            break;
          case '--help':
            showInfo();
            break;
          default:
            output.write(getInvalidMsg());
        }
        break;
      case 'hash':
        await calculateHash(args[0]);
        break;
      case 'compress':
        compress(args[0], args[1]);
        break;
      case 'decompress':
        decompress(args[0], args[1]);
        break;
      case 'help':
        showInfo();
        break;
      default:
        output.write(getInvalidMsg());
        break;
    }
  }
}