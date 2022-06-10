# File manager

## Instructions

  1. check node version ```node -v``` (should be >= 16.x)
  2. git clone https://github.com/Diluks93/file-manager.git
  3. cd file-manager
  4. git checkout develop
  5. npm run start -- --username=your_username
  6. help

## Description
  ```command``` ```arguments```

  1. help - show help.
  2. .exit - Exit the program.
  3. up [..] - Go to the parent directory.
  4. ls - Show the list of files in the current directory.
  5. cd ```path``` - Change the current directory.
  6. cat ```filename``` - Show the content of the file.
  7. add ```filename``` - Create a new file.
  8. rm ```filename``` - Remove the file.
  9. mv ```filename``` ```new_filename``` - Move the file.
  10. cp ```filename``` ```directory_name``` - Copy the file.
  11. rn ```filename``` ```new_name_filename``` - Rename the file.
  12. os ```options```

    12.1 --EOL - Show the end of line character.
    12.2  --cpus - Show the number of CPUs and clock rate (in GHz).
    12.3  --homedir - Show the home directory.
    12.4  --username - Show the username.
    12.5  --architecture[arch] - Show the architecture.

  13. hash ```filename``` - Show the hash of the file.
  14. compress ```filename``` ```new_filename``` - Compress the file using Brotli algorithm.
  15. decompress ```filename``` ```new_filename``` - Decompress the file using Brotli algorithm.

## Attention
  The program is not designed to work with files with spaces in their names.
