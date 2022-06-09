import { stdout as output, env, arch  } from 'process';
import { EOL, cpus, userInfo } from 'os';

import { dialog } from './dialog.js';

const { getInfoAboutCpus, getInfoAboutCpusModel, getInfoHomedir, getInfoAboutArchitecture, getInfoAboutUsername, getEndOfLine } = dialog;

class OperationSystem {
  showEndOfLine() {
    if (EOL === '\r\n') {
      output.write(getEndOfLine('\\r\\n'));
    } else if (EOL === '\\n') {
      output.write(getEndOfLine('\\n'));
    }
  }

  getCpusCount() {
    output.write(getInfoAboutCpus(cpus().length));
  }

  getCpusModel() {
    output.write(cpus().map(getInfoAboutCpusModel).join(EOL) + EOL);
  }

  getHomedir() {
    output.write(getInfoHomedir(env.HOME));
  }

  getUsername() {
    output.write(getInfoAboutUsername(userInfo().username));
  }

  getArchitecture() {
    output.write(getInfoAboutArchitecture(arch));
  }
}

export const operationSystem = new OperationSystem();