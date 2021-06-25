const assert = require('assert'); //used to make assertions about tests. Assert soma value is equal to other value
const ganache = require('ganache-cli') //this is gonna serve as our local ethereum test network
const Web3 = require('web3'); //we are requiring a constructor used to create instances of web3 library | we can think of it as its our class
//purpose of creating multiple instances it to connect to a different ethereum network
//however, very unusual to work with more than one at the same time.
//so its encouraged to use only one instance
