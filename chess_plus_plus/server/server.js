const express = require('express')
const http = require('http')
const jwtDecode = require('jwt-decode')
// const io = require('socket.io')(http, { path: '/game/socket.io'})

const checkAuthenticity = require('./authentication/checkAuthenticity.js')
const games = require('./games/games.js')
const { handleMove } = require('./games/handleMove.js')


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
  const userId = removeBearer(req.headers['authorization']);
  const userName = getUsername(userId);
  const response = games.create(userName);
  res.status(200).send(response); // todo : actually call from frontend
})

io.on('connection', socket => {
  console.log('connected')

  const gameId = socket.request._query['gameId']
  const userId = socket.request._query['idToken']
  const userName = getUsername(userId);

  const game =  games.getById(gameId);
  if (game === null) { 
    socket.disconnect(true);
    return;
  }

  if (!game.containsPlayer(userName)) {
    game.addPlayer(userName);
  }

  if (!game.addSocketId(userName, socket.id)) {
    // player connected is not a part of the game. Spectating (currently) not supported, but we don't need to disconnect them.
  }

  socket.emit('clientColor', game.color(userName));


  socket.on('playerMove', (arg) => {
    updated_game = handleMove(arg)
    console.log(updated_game.whiteBoard)
    console.log(updated_game.blackBoard)

    io.to(updated_game.whiteUserSocketId).emit('updateAfterMove', {'board': updated_game.whiteBoard})
    io.to(updated_game.blackUserSocketId).emit('updateAfterMove', {'board': updated_game.blackBoard})
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
});

server.listen(port, () => {
  console.log(`started server listening on port ${port}`)
})

const removeBearer = tokenWithBearer => {
  return tokenWithBearer.split(' ')[1];
}

const getUsername = idToken => {
  return jwtDecode(idToken)['cognito:username']
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}