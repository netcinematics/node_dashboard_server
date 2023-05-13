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

> REMEMBER: update prod urls in react

