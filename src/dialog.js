export const getGreeting = (username) => {
  return `Welcome to the File Manager, ${username}!`;
} 

export const getFarewell = (username) => {
  return `Thank you for using File Manager, ${username}!`;
}

export const getNamePathDirectory = (path) => {
  return `You are currently in ${path}`;
}

export const getInvalidMsg = () => {
  return `Invalid command. Try again.`;
}
