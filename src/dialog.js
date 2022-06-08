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
    return `\x1b[31mOperation failed\n\x1b[0m`;
  }
}

export const dialog = new Dialog();