// assertion about test. We can assert x is equal to 3
const assert = require('assert');

const ganache = require('ganache-cli');

// We're importing Web3 as a constructor function. By convention constructor is in upper case
const Web3 = require('web3');

// creates an instance of web3 and tells it to attempt to connect to this local network provided by ganache
// hosted in my local machine
const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface, bytecode} = require('../compile');

const INITIAL_MESSAGE = 'Obi Wan Kenobi';

const CUSTOM_SET_MESSAGE = "General Grivious";

let accounts;
let inbox;

beforeEach(async () => {
	// Get a list of accounts
	// .then is a promise. It's not good though rather use Async
	// web3.eth.getAccounts().then(fetchedAccounts => {
	// 	console.log(fetchedAccounts);
	// });
	
	// Async
	accounts = await web3.eth.getAccounts();

	// use one of the contracts to deploy
	inbox = await new web3.eth.Contract(JSON.parse(interface))
				.deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
				.send({ from: accounts[0], gas: '1000000' });

	inbox.setProvider(provider);

});

describe('Inbox', () => {
	it('deploys a contract', () => {
		// return true if the .ok(val) is not null
		assert.ok(inbox.options.address);
	});

	it('has a default message', async () => {
		// .call() is used to send the transaction, which is to get the value of the storage variable
		// 'message', to the network.
    	const message = await inbox.methods.message().call();
    	assert.equal(message, INITIAL_MESSAGE);
  	});

  	it('can change the message',  async () => {
  		// .send() is used to send the transaction, which is to set the storage variable 'message'
  		// a new value, to the network
  		// {from: accounts[0]} is referring that who is doing the transaction.
  		await inbox.methods.setMessage(CUSTOM_SET_MESSAGE).send({ from: accounts[0] });
  		const message = await inbox.methods.message().call();
    	assert.equal(message, CUSTOM_SET_MESSAGE);
  	});
});