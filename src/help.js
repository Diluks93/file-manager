import { stdout as output } from 'process';
import { EOL } from 'os';

class ShowHelpInformation {
  showInfo() {
    output.write(`
  <command> <argument>

  \x1b[34mCommands:\x1b[0m
  .exit - Exit from the program.
  help - Show this help.
  up [..] - Go to the parent directory.
  ls - Show the list of files in the current directory.
  cd <path> - Change the current directory.
  cat <filename> - Show the content of the file.
  add <filename> - Create a new file.
  rn <filename> <new_filename> - Rename the file.
  cp <file> <path_to_new_directory> - Copy the file.
  mv <file> <path_to_new_directory> - Move the file.
  rm <file> - Remove the file.
  os <option> - Show the operating system.
  \x1b[34mOptions:\x1b[0m
    --EOL - Show the end of line.
    --cpus - Show the number of CPUs and clock rate (in GHz).
    --homedir - Show the home directory.
    --username - Show the username.
    --architecture [arch] - Show CPU architecture for which Node.js binary has compiled.
  hash <filename> - Show the hash of the file.
  compress <filename> <new_filename> - Compress the file using Brotli algorithm.
  decompress <filename> <new_filename> - Decompress the file using Brotli algorithm.

  \x1b[31mAttention:\x1b[0m
  The program is not designed to work with files with spaces in their names.${EOL}`);
  }
}

export const showHelp = new ShowHelpInformation();