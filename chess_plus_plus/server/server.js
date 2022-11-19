const express = require('express')
const http = require('http')
const jwtDecode = require('jwt-decode')

const checkAuthenticity = require('./authentication/checkAuthenticity.js')
const games = require('./games/games.js')
const { handleMove } = require('./games/handleMove.js')
const { handlePromotionMove } = require('./games/handlePromotionMove.js')
const { handleUseCard } = require('./games/handleUseCard.js')

let chats = {}

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
  // Create new empty chat
  chats[response.game_id] = []
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
  socket.on('gameMounted', () => {
    socket.emit('updateAfterMove', {'board': game.color(userName) === 'white' ? game.whiteBoard : game.blackBoard,
    'specialSquare': game.color(userName) === 'white' ? game.whiteSpecialSquare : game.blackSpecialSquare,
   })
   updateHands(game)
  })
  
  socket.on('sendMessage', (arg) => {
    arg = JSON.parse(arg);
    messages = chats[arg.game_id];
    messages.push({
      message: arg.message,
      isWhite : arg.isWhite,
      username : arg.isWhite ? game.whiteUserId : game.blackUserId
    })
    console.log(messages);
    io.to(game.whiteUserSocketId).emit('updateMessages', {'messages': messages})
    io.to(game.blackUserSocketId).emit('updateMessages', {'messages': messages})
  })

  socket.on('playerMove', (arg) => {
    updated_game_info = handleMove(arg)
    if (updated_game_info === null) {
      return
    }
    updated_game = updated_game_info[0]
    check_mate_status = updated_game_info[1]
    if (updated_game === null) {
      // TODO: tell frontend it was invalid and force refresh the page or something, idk yet
      return
    }
    console.log(updated_game.whiteCards)
    console.log(updated_game.blackCards)

    updatePlayers(updated_game)
    
    console.log("Checkmate status:", check_mate_status)

    // If Check-Mate, handle this
    if (check_mate_status !== 'X') {
      if (check_mate_status === 'W') {
        io.to(updated_game.whiteUserSocketId).emit('win', {'board': updated_game.whiteBoard})
        io.to(updated_game.blackUserSocketId).emit('loss', {'board': updated_game.blackBoard})
      }
      else {
        io.to(updated_game.whiteUserSocketId).emit('loss', {'board': updated_game.whiteBoard})
        io.to(updated_game.blackUserSocketId).emit('win', {'board': updated_game.blackBoard})
      }
    }

  }) 

  socket.on('useCard', arg => {
    console.log('trying to use card')
    updated_game = handleUseCard(arg, userName)
    if (typeof updated_game === 'string') {
      socket.emit('error', {text: updated_game})
      return
    }
    updatePlayers(updated_game)
    // make a function to emit a new hand to a specific player. 
    // though, if we are keeping track of both players being able to know 
    // the number of cards, then all we need is the "updated game" to do this
  })

  socket.on('promotion', arg => {
    updated_game_info = handlePromotionMove(arg)
    console.log(updated_game_info)
    if (updated_game_info === null) {
      return
    }
    updated_game = updated_game_info[0]
    check_mate_status = updated_game_info[1]
    if (updated_game === null) {
      // TODO: tell frontend it was invalid and force refresh the page or something, idk yet
      return
    }
    updatePlayers(updated_game)

    if (check_mate_status !== 'X') {
      if (check_mate_status === 'W') {
        io.to(updated_game.whiteUserSocketId).emit('win', {'board': updated_game.whiteBoard})
        io.to(updated_game.blackUserSocketId).emit('loss', {'board': updated_game.blackBoard})
      }
      else {
        io.to(updated_game.whiteUserSocketId).emit('loss', {'board': updated_game.whiteBoard})
        io.to(updated_game.blackUserSocketId).emit('win', {'board': updated_game.blackBoard})
      }
    }
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
});

server.listen(port, () => {
  console.log(`started server listening on port ${port}`)
})

const updateHands = game => {
  // if (game.whiteUserSocketId !== null) {
    io.to(game.whiteUserSocketId).emit('updateHand', {cards: game.whiteCards, opponentCardCount: game.blackCards.length})

  // }
  // if (game.blackUserSocketId !== null)
  // {
  io.to(game.blackUserSocketId).emit('updateHand', {cards: game.blackCards, opponentCardCount: game.whiteCards.length})

  // }
}
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

const updatePlayers = game => {
  // may want to consider a way to not pass the card's effects to frontend (separate DTO and Model)
  // although it appears this is already done
  // TODO: figure out how to tell player that opponent has cards.
  updateHands(game)
  io.to(game.whiteUserSocketId).emit('updateAfterMove', {'board': game.whiteBoard,
   'specialSquare': game.whiteSpecialSquare,
  })
  io.to(game.blackUserSocketId).emit('updateAfterMove', {'board': game.blackBoard,
   'specialSquare': game.blackSpecialSquare,
  })
}



