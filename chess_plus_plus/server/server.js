const express = require('express')

const app = express()
const port = process.env.PORT || 5001

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

})

app.get('/hello', (req, res) => {
  console.log("received request")
  res.send({"text": 'Hello World!'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})