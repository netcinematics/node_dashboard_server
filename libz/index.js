'use strict';
// const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();
const fs = require('fs');

let index_DATA_1 = require('./cardTokenz2.json');
let token_index = require('./token_index.json');
// let aWORDZa_DATA = require('./aWORDZa.md')
// import info from `./package.json`

router.get('/lookup/:tokenz', (req, res) => { //DYNAMIC-TOKEN-SETS_1
    console.log('GET tokenz!',req.params.tokenz)
    serveDynamicTokenz(res, req.params.tokenz, req.query.lookup)

});

function serveDynamicTokenz(res, tokenTitle, tokenNumz){
    console.log('dynamic tokenz: ',tokenTitle, tokenNumz)
    if(!tokenTitle){ console.error(err); return; }
    //three-way-lookup-system. 0_index_overview, 1_main, 2_details,...
    if(!tokenNumz){ // LOAD_JSON_INDEX with TXT_OVERVIEW : 0_index
        console.log('JSON TOKEN lookup: ',tokenTitle,'.json')
        // fs.readFile(`./libz/indexTokenz.md`, 'utf8', (err, indexdata) => {
        fs.readFile(`./libz/${tokenTitle}.json`, 'utf8', (err, tokenData) => {
            if (err) { console.error(err); return; }
            debugger;
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.json({token:'exmpl1'});              
            // res.send(tokenData);
        })


    } else if(tokenNumz=='markdown'){ // LOAD_MD_MARKDOWN_MAIN : 1_main
        console.log('MARKDOWN lookup: ',tokenTitle,'.md')
        // fs.readFile(`./libz/indexTokenz.md`, 'utf8', (err, indexdata) => {
        fs.readFile(`./libz/${tokenTitle}.md`, 'utf8', (err, tokenData) => {
            if (err) { console.error(err); return; }
            // debugger;
            console.log('MARKDOWN found: ',tokenTitle,'.md')
            // res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            // res.json({token:'exmpl1'});              
            res.send(tokenData);
        })


    // } else if(tokenNumz>1){ //LOAD_NUMZ_DETAILS : 2_details
    //     fs.readFile(`./libz/${tokenTitle}.md`, 'utf8', (err, tokenData) => {
    //         if (err) { console.error(err); return; }
    //         debugger;
    //         // res.setHeader('Content-Type', 'application/json');
    //         res.statusCode = 200;
    //         // res.json({token:'exmpl1'});              
    //         res.send(tokenData);
    //     })

    } else{
        console.error("no token");
        res.statusCode = 404;
        res.send("no data");
        // res.setHeader('Content-Type', 'application/json');
    }



}


router.get('/cardz/', (req, res) => {
    console.log('4b',req.query.lookup)
    // if(!token_index){if (err) { console.error(err); return; }}
    // res.send(token_index) //also works
    // console.log('cardz!')
    // if(!index_DATA_1){if (err) { console.error(err); return; }}
    // res.send(index_DATA_1) //works
    fs.readFile('./index.md', 'utf8', (err, indexdata) => {
        if (err) { console.error(err); return; }
        // debugger;
        res.send(indexdata);
    })
});

router.get('/tokenz/', (req, res) => {
    console.log('2b',req.query.lookup, req.params.tokens)
    if(!token_index){if (err) { console.error(err); return; }}
    res.send(token_index) //also works
    // if(!index_DATA_1){if (err) { console.error(err); return; }}
    // res.send(index_DATA_1) //works
    console.log('tokenz!')
    // fs.readFile('./libz/indexTokenz.md', 'utf8', (err, indexdata) => {
    //     if (err) { console.error(err); return; }
    //     debugger;
    //     res.send(indexdata);
    // })
});

// router.get('/', (req, res) => {
//     console.log('1b',req.query.lookup)
//     let lookup = (req && req.query && req.query.lookup)? req.query.lookup : "not found";
//     if(lookup != "not found"){ //DYNAMIC-FILE-LOOKUP
//         // fs.readFile('./libz/aWORDZa.md', 'utf8', (err, data) => {
//         fs.readFile("./libz/"+lookup+".md", 'utf8', (err, data) => {
//             if (err) {
//                 next();
//             } else {

//                 console.log("DATASENT", lookup, data)
//                 res.send(data);
//             }
//           });
//     } else {
//         console.log("DATASENT", "not found")
//         console.error(err);
//         res.send("not found");
//     }
//   });

//   router.get('/', (req, res) => {
//     console.log('1c')
//     fs.readFile('./libz/index.md', 'utf8', (err, indexdata) => {
//         if (err) {
//         console.error(err);
//         // return;
//         next();
//         }
//         console.log("Default Index", lookup)
//         res.send(indexdata);
//     })
//   });

module.exports = {router};