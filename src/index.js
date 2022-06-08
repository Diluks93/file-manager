import { parseArgs } from './args.js';
import { dialog } from './dialog.js';
import { readline } from './readline.js';

const init = () => {
  const username = parseArgs();
  process.stdout.write(dialog.getGreeting(username) + '\n');
  readline(username);
}

init();
