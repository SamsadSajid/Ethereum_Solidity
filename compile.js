const path = require('path'); // build a path to traverse the directory

const fs = require('fs');

const solc = require('solc'); // solc to compile solidity

// go to the curr directory->Contracts->Inbox.sol
const inboxPath = path.resolve(__dirname, 'Contracts', 'Inbox.sol');

// read the .sol file from disc
const src = fs.readFileSync(inboxPath, 'utf8');

// sompile the source file with 1 instance
// console.log(solc.compile(src, 1));

module.exports = solc.compile(src, 1).contracts[':Inbox'];