const express = require('express')

const app = express()
app.use(express.json()) // parses request body as JSON
const port = process.env.PORT || 5001

const checkAuthenticity = require('./authentication/checkAuthenticity.js')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

})

app.get('/hello', (req, res) => {
  console.log("received request")
  res.status(200).send({"text": 'Hello World!'})
})

app.post('/authenticate', async (req, res) => {
  requestBody = req.body

  let text = await checkAuthenticity.checkAuthenticity(requestBody);

  return res.status(200).send(text)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}