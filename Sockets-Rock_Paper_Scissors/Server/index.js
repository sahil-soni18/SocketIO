import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const players = {};
let playerChoices = {};

// Handle player connection
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Assign player to a room
  const room = 'room1';
  socket.join(room);
  players[socket.id] = room;

  if (Object.keys(players).length % 2 === 0) {
    io.to(room).emit('gameStart', 'Game started! Make your choice.');
  } else {
    socket.emit('errorMessage', 'Waiting for an opponent...');
  }

  // Handle player move
  socket.on('playerMove', ({ choice }) => {
    playerChoices[socket.id] = choice;

    // Check if both players have made their choices
    const roomPlayers = Object.keys(players).filter((id) => players[id] === room);
    if (roomPlayers.every((id) => playerChoices[id])) {
      const [player1, player2] = roomPlayers;
      const result = determineWinner(playerChoices[player1], playerChoices[player2]);

      io.to(player1).emit('gameResult', `Your opponent chose ${playerChoices[player2]}. ${result.player1}`);
      io.to(player2).emit('gameResult', `Your opponent chose ${playerChoices[player1]}. ${result.player2}`);

      // Reset choices
      playerChoices = {};
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    delete players[socket.id];
  });
});

// Determine the game result
function determineWinner(choice1, choice2) {
  if (choice1 === choice2) {
    return { player1: 'It\'s a draw!', player2: 'It\'s a draw!' };
  }

  const winningCombos = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  if (winningCombos[choice1] === choice2) {
    return { player1: 'You win!', player2: 'You lose!' };
  } else {
    return { player1: 'You lose!', player2: 'You win!' };
  }
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);  // Output: Server is running on port 3000
})