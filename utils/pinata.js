require('dotenv').config();
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;
const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => { //1 persist json data... foreva (maybe)
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    return axios
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then( (response) => {
           console.log("IPFS_HASH:",response.data.IpfsHash)
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch( (error) => {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }
        });
};