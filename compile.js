const path = require('path'); //standard modules. helps us get cross platform compatibility
// path: right path to access inbox.sol using windows or unix
const fs = require('fs'); //default modules so doenst need to be installed using npm
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
//read the raw source code from our contract: source
const source = fs.readFileSync(inboxPath, 'utf-8');

//after getting the code from source code and inserted into source we compile it 
module.exports = solc.compile(source, 1).contracts[':Inbox']; //source of the contract, number of contracts
//adding module.exports makes our compilation results available to the rest of the files
//given that its an json object we can filter by the contract using .contracts[':nameOfContract']