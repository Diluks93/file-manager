class Dialog {
  getGreeting (username) {
    return `\x1b[32mWelcome to the File Manager, ${username}!\x1b[0m`;
  }

  getFarewell (username) {
    return `\x1b[0mThank you for using File Manager, ${username}!\x1b[0m`;
  }

  getNamePathDirectory (path) {
    return `\x1b[0mYou are currently in \x1b[34m${path}\x1b[0m`;
  }

  getInvalidMsg () {
    return `\x1b[33mInvalid command. Try again.\n\x1b[0m`;
  }

  getErrorMsg () {
    process.stdout.write(`\x1b[31mOperation failed\n\x1b[0m`);
  }

  getInfoAboutCpus (num) {
    return `Overall amount of CPUS ${num} \n`;
  }

  getInfoAboutCpusModel ({model, speed}) {
    return `Model: ${model}\nSpeed: ${speed}`;
  }

  getInfoHomedir (env) {
    return `Home directory: ${env} \n`;
  }

  getInfoAboutArchitecture (arch) {
    return `Architecture: ${arch} \n`;
  }

  getInfoAboutUsername (username) { 
    return `Username: ${username} \n`;
  }

  getEndOfLine (line) {
    return `\x1b[0mEnd of line: ${line}\x1b[0m \n`;
  }
}

export const dialog = new Dialog();