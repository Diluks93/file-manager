export const parseArgs = () => {
  const args = process.argv.slice(2);
  const username = args[0].slice(args[0].indexOf('=') + 1);

  return username;
};