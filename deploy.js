const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');


// truffle HDWalletProvider requires two arguments: menmonic seed and url of the network we want to connect
// connecting to a real network REQUIRES a node. this we are using infura's node
const provider = new HDWalletProvider(
    'member drastic depend slab salon trade charge safe adult provide increase general',
    'https://rinkeby.infura.io/v3/6cf5356d977345cb9a73553bf83be61f'
);

// we can use this instance to send ethe, deploy and update contracts, etc
const web3 = new Web3(provider);  

const deploy = async () => {
    //we get all accounts of the menmonic 
    const accounts = await web3.eth.getAccounts();
    
    console.log("Attempeting to deploy from account ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] });

    console.log('Deployed at: ' + result.options.address);
    }

deploy();

