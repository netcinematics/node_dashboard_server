const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');
require('dotenv').config();
const port = 8008;
/*****************************INSTRUCTION:
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

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});

// Export the Express API
module.exports = app