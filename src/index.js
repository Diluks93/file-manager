import { parseArgs } from './args.js';
import { getGreeting } from './dialog.js';
import { readline } from './readline.js';

const init = () => {
  const username = parseArgs();
  process.stdout.write(getGreeting(username) + '\n');
  readline(username);
}

init();
