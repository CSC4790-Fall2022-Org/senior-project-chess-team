const express = require('express')
const http = require('http')
// const io = require('socket.io')(http, { path: '/game/socket.io'})

const checkAuthenticity = require('./authentication/checkAuthenticity.js')
const gameRoom = require('./gameroom/gameroom.js')


const app = express()
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  },
  path: '/game/socket.io'

})

const port = process.env.PORT || 5001

app.use(express.json()) // parses request body as JSON
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, XMLHttpRequest, Content-Type, Accept, Authorization");
  next();
})

//TODO:  add middleware that splits bearer auth into id token and validates it

app.post('/authenticate', async (req, res) => {
  requestBody = req.body
  let text = await checkAuthenticity.checkAuthenticity(requestBody);
  if (text?.error) {
    return res.status(400).send(text) // should handle error differently, but okay for now
  }
  return res.status(200).send(text)
})


app.post('/game', (req, res) => {
  console.log('Received request to create game')
  const userId = req.headers['authorization']
  const response = gameRoom.create(userId);
  res.status(200).send(response); // todo : actually call from frontend
})

io.on('connection', socket => {
  console.log('connected af')
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
});

server.listen(port, () => {
  console.log(`started server listening on port ${port}`)
})


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}