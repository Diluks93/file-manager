import { stdin as input, stdout as output, chdir, cwd } from 'process';
import { createInterface } from 'readline';
import { homedir } from 'os';

import { operationSystem }from  './os.js';
import { fileSystem } from './fs.js';
import { dialog } from './dialog.js';

const { getFarewell, getNamePathDirectory, getInvalidMsg } = dialog;
const { showIntoDirectory, changeDirectory, createNewFile, openFile, renameFile, copyFile, remove } = fileSystem;
const { showEndOfLine, getCpusCount, getCpusModel, getHomedir, getUsername, getArchitecture } = operationSystem;

export const readline = (username) => {
  const rl = createInterface({ input, output });

  chdir(homedir());
  output.write(getNamePathDirectory(cwd()) + '\n');

  rl.on('line', line => {
    checkInput(line);
    output.write(getNamePathDirectory(cwd()) + '\n');
  });

  rl.on('SIGINT', () => {
    output.write(getFarewell(username));
    rl.close();
  });

  const checkInput = async (line) => {
    const [command, ...args] = line.split(' ');
    switch(command) {
      case '.exit':
        output.write(getFarewell(username));
        rl.close();
        break;
      case 'up':
      case '..':
        chdir('..');
        break;
      case 'cd':
        changeDirectory(args[0]);
        break;
      case 'ls':
        showIntoDirectory(`${cwd()}`);
        break;
      case 'cat':
        openFile(args[0]);
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
            console.log('--help');
            break;
          default:
            output.write(getInvalidMsg());
        }
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