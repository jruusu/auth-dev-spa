const greet = (req, res) => {
  res.send({
    greeting: 'backend says hi'
  })
}

module.exports = {
  middleware: [ greet ]
}
