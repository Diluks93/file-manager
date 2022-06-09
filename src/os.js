import { stdout as output, env, arch  } from 'process';
import { EOL, cpus, userInfo } from 'os';

class OperationSystem {
  showEndOfLine() {
    if (EOL === '\r\n') {
      output.write('\\r\\n' + EOL);
    } else if (EOL === '\\n') {
      output.write('\\n' + EOL);
    }
  }

  getCpusCount() {
    output.write(`Overall amount of CPUS ${cpus().length}` + EOL);
  }

  getCpusModel() {
    output.write(cpus().map(({model, speed}) => `Model: ${model}${EOL}Speed: ${speed}`).join(EOL) + EOL);
  }

  getHomedir() {
    output.write(`Home directory: ${env.HOME}` + EOL);
  }

  getUsername() {
    output.write(`Username: ${userInfo().username}` + EOL);
  }

  getArchitecture() {
    output.write(`Architecture: ${arch}` + EOL);
  }
}

export const operationSystem = new OperationSystem();