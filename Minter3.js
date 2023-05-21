//Minter3 - Ai prompt using web3
const Web3 = require('web3');
const Contract = require('web3-eth-contract');
const contractAbi = require('./contractAbi.json'); // replace with your actual contract ABI
const privateKey = '0x...'; // replace with your actual private key
const contractAddress = '0x...'; // replace with your actual contract address
const alchemyApiKey = '<YOUR_ALCHEMY_API_KEY>'; // replace with your actual Alchemy API key

const web3 = new Web3(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`);
const contract = new Contract(contractAbi, contractAddress);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

async function mintTokens(to, amount) {
  const data = contract.methods.mint(to, amount).encodeABI();
  const gas = await contract.methods.mint(to, amount).estimateGas({ from: account.address });
  const gasPrice = await web3.eth.getGasPrice();
  const nonce = await web3.eth.getTransactionCount(account.address);
  const rawTx = {
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gas),
    to: contractAddress,
    value: '0x00',
    data,
  };
  const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey);
  const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  console.log(`Transaction hash: ${txHash}`);
}

mintTokens('0x123...', '1000000000000000000'); // replace with the address to mint tokens to and the amount to mint

