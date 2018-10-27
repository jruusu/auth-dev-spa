const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const greet = (req, res) => {
  console.log('req user', JSON.stringify(req.user))
  res.send({
    greeting: 'backend says hi'
  })
}

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_BACKEND_API_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: [ 'RS256' ]
})

module.exports = {
  middleware: [ jwtCheck, greet ]
}
