const { interface, bytecode } = require('../compile') //interface refers to the abi 
const assert = require('assert'); //used to make assertions about tests. Assert soma value is equal to other value
const ganache = require('ganache-cli'); //this is gonna serve as our local ethereum test network
const Web3 = require('web3'); //we are requiring a constructor used to create instances of web3 library | we can think of it as its our class
//purpose of creating multiple instances it to connect to a different ethereum network
//however, very unusual to work with more than one at the same time.
//so its encouraged to use only one instance
//lowercase: instance
const web3 = new Web3(ganache.provider()); //o provider é o do ganache
// for example: if we were to connect to rinkeby network we'd change the constructor and and it wouldnt be ganache.provider anymore

let accounts;
let inbox;


//Nesse beforeEach estamos criando um contrato com o código do inbox.sol pra cada teste
//Antes de cada teste, temos que pegar os endereços que o Ganache disponibiliza, para conseguirmos fazer deploy e teste do smart contract
//async function
beforeEach(async () => {

    //get a list of all ganache accounts in an async way and store them in an variable
    accounts = await web3.eth.getAccounts()

    //use one of those accounts to deploy the contract
    //this object below (inbox) becomes the JS representation of the contract.
    //represents what exists in the blockchain. we can call functions and interact directly with the contracts that exist in the blockchain
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        
        .deploy({
            data: bytecode,
            arguments: ['Hi there!']
        })

        //send is sending the contract to ganache test network 
        .send({ from: accounts[0], gas: '1000000'})
}) 

describe('Inbox', () => {

    it('Deploys a contract', () => {
        //assert.ok checks if the parameter is a defined value
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        //inbox is a js instance that represents the contract in blockchain
        //this method interact with the contract functions and call it using .call
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, 'Hi there!');
    });

    it('Can change the message?', async () => {
        //changing value of setMessage contract function
        await inbox.methods.setMessage("OOOOOOI").send({ from: accounts[0]  })
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, "Hi there!");
    })
})
