'use strict';
/**************************** MINIMUM NodeJS */
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');
require('dotenv').config();
const port = 8008;
/*****************************API INSTRUCTION:
> npm run start
- http://localhost:8008/news
- https://node-dashboard-server.vercel.app/news
- https://node-dashboard-server.vercel.app/ai1
\*****************************/
const { Configuration, OpenAIApi } = require("openai");

app.get('/', (req, res) => {
  res.send('Holo, wurldz88!');
});

app.get('/ai1', async (req, res) => {
  try {
      const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      temperature: 0,
      max_tokens: 7,
      });
      console.log(response.data.choices[0].text)
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.json(response.data.choices);        
  } catch (error) {
      console.error(error);
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.json({data:'err1'});        
  }    
});

app.get('/ai2', async (req, res) => {
  // platform.openai.com/docs/api-reference/chat/create
  // POST https://api.openai.com/v1/chat/completions
  console.log("params", req.query.prompt)
  let prompt = (req && req.query && req.query.prompt)? req.query.prompt : "how are you?";
  try{
    const options = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.44, max_tokens:44
    }
    const {data} = await axios.post('https://api.openai.com/v1/chat/completions', options,
    {
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type':'application/json'
        }
    }
    )
    res.json(data.choices);
  } catch (error) {
    console.error(error);
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.json({data:'err22'});        
  } 
});

app.get('/news', async (req, res) => {

    const options = {
      method: 'GET',
      url: 'https://crypto-news-live9.p.rapidapi.com/news/CryptoNews',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAD_KEY,
        'X-RapidAPI-Host': 'crypto-news-live9.p.rapidapi.com'
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 404;
        res.json({data:'err1'});
    }
});

// const { router: apiRouter } = require('./api');
// app.use('/api/crypto/', cryptoRouter);

/******************************MINIMUM-CRYPTO */
const Web3 = require('web3');
const Contract = require('web3-eth-contract');
const contractAbi = require('./contractAbi.json'); // replace with your actual contract ABI

app.get('/crypto1', async (req, res) => {
   console.log('crypto1')
  debugger;
  // const privateKey = '0x...'; // replace with your actual private key
  // const contractAddress = '0x...'; // replace with your actual contract address
  // const alchemyApiKey = '<YOUR_ALCHEMY_API_KEY>'; // replace with your actual Alchemy API key
  
  // const web3 = new Web3(`https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`);
  // const contract = new Contract(contractAbi, contractAddress);
  // const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  
  // async function mintTokens(to, amount) {
  //   const data = contract.methods.mint(to, amount).encodeABI();
  //   const gas = await contract.methods.mint(to, amount).estimateGas({ from: account.address });
  //   const gasPrice = await web3.eth.getGasPrice();
  //   const nonce = await web3.eth.getTransactionCount(account.address);
  //   const rawTx = {
  //     nonce: web3.utils.toHex(nonce),
  //     gasPrice: web3.utils.toHex(gasPrice),
  //     gasLimit: web3.utils.toHex(gas),
  //     to: contractAddress,
  //     value: '0x00',
  //     data,
  //   };
  //   const signedTx = await web3.eth.accounts.signTransaction(rawTx, privateKey);
  //   const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  //   console.log(`Transaction hash: ${txHash}`);
  // }
  
  // mintTokens('0x123...', '1000000000000000000'); // replace with the address to mint tokens to and the amount to mint
  




  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  res.json({data:'crypto1'});


});


app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});

// Export the Express API
module.exports = app