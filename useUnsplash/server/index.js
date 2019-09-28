require('dotenv').config();
global.fetch = require('node-fetch');

import Unsplash, { toJson } from 'unsplash-js'
const express = require('express')
const cors = require('cors')
const RateLimit = require('express-rate-limit');

const app = express()
const unsplash = new Unsplash({
  applicationId: process.env.APPLICATION_ID,
  secret: process.env.SECRET
});
app.use(cors())
app.set('port', process.env.PORT || 3000)
app.enable('trust proxy')
const sleep = 600000; 
 
const limiter = new RateLimit({
  windowMs: sleep,
  max: 10, 
  delayMs: 0 
})

app.get('/photos', limiter, (req, res) => {
  console.log("Request Made: ", req.query)
  const { query, page, size } = req.query
  console.log(query, page, size)
  return unsplash.search.photos(query, page, size)
    .then(toJson)
    .then(json => res.status(200).json(json))
    .catch(err => console.log(err))
})

app.listen(
  app.get('port'),
  () => console.log(`Server is listening at port ${app.get('port')}`)
)