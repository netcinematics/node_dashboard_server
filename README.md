# node_dashboard_server
server side DEPLOY to VERCEL for React Dashboard (separate)

### backend SETUP
> npm init

> npm i express axios dotenv cors

> index.js + e-n-v-s

> npm i nodemon
    "start": "nodemon index.js",

> npm run start

### TEST:
//npm run start
//http://localhost:8008/news
//data

### DEPLOY
vercel.json...
https://jonathans199.medium.com/deploy-node-js-express-api-to-vercel-dbf4461795a5
- commit, push
- login, connect vercel to github
- vercel, new project connect to repo
- setup: other ./ 
- add E N V V A R S
> DEPLOY btn

### dev / prod URLs
- dev:    http://localhost:8008
- devapi: http://localhost:8008/news
- prod:   https://node-dashboard-server.vercel.app/
- prod:   https://node-dashboard-server.vercel.app/news

- prodapi:https://node-dashboard-server.vercel.app/news

> REMEMBER to deploy gh-pages: npm run deploy

# OpenAI API

> $ npm install openai


> REMEMBER: update prod urls in react

---------

## EXPERIMENTS

### A. Minter1/React (refactor from React minter-starter-files)

-  e.n.v, contract abi, utils, Minter.js

- EXAMPLE REQUIREMENTS:

### A. Minter1 - React Minter (alchemy-web3) //DEPRECATED
// Prefer SDK: https://www.npmjs.com/package/@alch/alchemy-web3
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey); //alchemy/URL/key
window.contract = await new web3.eth.Contract(contractABI, contractAddress);
const transParams = {
to: contractAddress, // Required except during contract publications.
from: window.ethereum.selectedAddress, // must match user's active address.
data: 
  window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI(),
};
const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
});  

### B. Minter2 - CREATOR/Minter COMPONENT (alchemy-sdk, wagmi)
//preferred : https://www.npmjs.com/package/alchemy-sdk
//demo: 
> npm i alchemy-sdk
import { Contract } from "alchemy-sdk";
import { useAccount, useSigner } from "wagmi";
const { address, isDisconnected } = useAccount();
const { data: signer } = useSigner();
const nftContract = new Contract(contractAddress, abi, signer);
const mintTx = await nftContract.safeMint(tokenUri, address);

### C. Minter 3 - from Ai Prompt Minter (web3,web3-eth-contract)
// 
const Web3 = require('web3');
const Contract = require('web3-eth-contract');
const web3 = new Web3(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`);
const contract = new Contract(contractAbi, contractAddress);
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const data = contract.methods.mint(to, amount).encodeABI();
const gas = await contract.methods.mint(to, amount).estimateGas({ from: account.address });
  