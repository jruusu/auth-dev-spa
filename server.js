const backend = require('./backend')
const express = require('express')

const app = express()
const port = process.env.PORT || '3000'

app.get('/backend', ...backend.middleware)

app.get('/config', (req, res) => res.send({
    auth0: {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      backendID: process.env.AUTH0_BACKEND_API_ID,
    }
  }))

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
