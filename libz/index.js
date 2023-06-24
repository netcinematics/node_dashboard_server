'use strict';
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();
const fs = require('fs');

let index_DATA_1 = require('./cardTokenz2.json');
// import info from `./package.json`

router.get('/tokenz/', (req, res) => {
    if(!index_DATA_1){if (err) { console.error(err); return; }}
    res.send(index_DATA_1)
    // console.log('tokenz!')
    // fs.readFile('./libz/indexTokenz.md', 'utf8', (err, indexdata) => {
    //     if (err) { console.error(err); return; }
    //     debugger;
    //     res.send(indexdata);
    // })


});

router.get('/', (req, res) => {
    let lookup = (req && req.query && req.query.lookup)? req.query.lookup : "not found";
    if(lookup != "not found"){ //DYNAMIC-FILE-LOOKUP
        // fs.readFile('./libz/aWORDZa.md', 'utf8', (err, data) => {
        fs.readFile("./libz/"+lookup+".md", 'utf8', (err, data) => {
            if (err) {
                fs.readFile('./libz/index.md', 'utf8', (err, indexdata) => {
                    if (err) {
                    console.error(err);
                    return;
                    }
                    console.log("Default Index", lookup)
                    res.send(indexdata);
                })
            } else {

                console.log("DATASENT", lookup, data)
                res.send(data);
            }
          });
    } else {
        console.log("DATASENT", "not found")
        res.send("not found");
    }
  });

module.exports = {router};