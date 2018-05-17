const HDWalletProvider = require('truffle-hdwallet-provider');

const Web3 = require('web3');

const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
	'general broccoli forget toilet try vivid term scale size guilt topic diet',
	'https://rinkeby.infura.io/0BV7iyuV0BspX0nZAlS2'
);

const web3 = new Web3(provider);

const INITIAL_MESSAGE = "Darth Vader";

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Attempting to deploy from account ', accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(interface))
				.deploy({ data: '0x' + bytecode, arguments: [INITIAL_MESSAGE] })
				.send({ gas: '1000000', from: accounts[0] });
	console.log('Contract deployed to ', result.options.address);
};

deploy();

// 0xBd066C1E32aD9aA551004C9943f1844364c05BAe

/*
 problem with .deploy({data}) and gas limit:
 Error: “The contract code couldn't be stored, please check your gas limit”

 solve:
 If you put '0x' in front of the bytecode it will assume the rest is in hexadecimal and left it alone.
 If there's no '0x' it will convert the whole string to hexadecimal.
 This is bad because the bytecode will be double the size and completely wrong.
 */