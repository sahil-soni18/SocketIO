// backend/server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import determineMultiplayerWinner from "./Multiplayer.js"; // Function to determine multiplayer winner
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow Vite dev server
    methods: ["GET", "POST"],
  },
});

// Serve static files from the React app
app.use(express.static("../frontend/dist"));

const roomData = {}; // To store room and player choices

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", (room) => {
    console.log(`User ${socket.id} joined room: ${room}`);
    
    if (!roomData[room]) {
      roomData[room] = { players: [], choices: {} };
    }
    
    console.log("Room Data: ", roomData);
    
    
    // Add player to the room
    if (!roomData[room].players.includes(socket.id)) {
      roomData[room].players.push(socket.id);
    }
    socket.join(room);
    console.log(`Room Data: `, roomData);

  // Notify the client about the room state
  io.to(room).emit("roomState", {
    players: roomData[room].players,
    choices: roomData[room].choices,
  });
  });

  // Handle player choice
  socket.on("playerChoice", ({ room, choice }) => {
    if (!roomData[room]) return;
  
    roomData[room].choices[socket.id] = choice;
  
    console.log(`Player ${socket.id} chose ${choice} in room ${room}`); // Debugging
  
    // Notify the room about the updated choices
    io.to(room).emit("roomState", {
      players: roomData[room].players,
      choices: roomData[room].choices,
    });
  
    // Check if both players have chosen
    if (
      Object.keys(roomData[room].choices).length === 2 &&
      roomData[room].players.length === 2
    ) {
      const [player1, player2] = roomData[room].players;
      const player1Choice = roomData[room].choices[player1];
      const player2Choice = roomData[room].choices[player2];
  
      console.log("Player 1:", player1Choice); // Debugging
      console.log("Player 2:", player2Choice); // Debugging
  
      const result = determineMultiplayerWinner(player1Choice, player2Choice);
      console.log("Game result:", result); // Debugging
  
      // Emit game result to the room
      io.to(room).emit("gameResult", {
        result,
        player1: { id: player1, choice: player1Choice },
        player2: { id: player2, choice: player2Choice },
      });
  
      // Reset room choices for next round
      roomData[room].choices = {};
    }
  });

  // Handle "play again" logic
  socket.on("playAgain", (room) => {
    if (roomData[room]) {
      roomData[room].choices = {}; // Reset choices for the room
      io.to(room).emit("resetGame");
    }
  });

  // Handle leaving a room
  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room: ${room}`);

    if (roomData[room]) {
      roomData[room].players = roomData[room].players.filter(
        (player) => player !== socket.id
      );

      // Notify other players in the room
      io.to(room).emit("message", `User ${socket.id} has left room: ${room}`);

      // Clean up room if empty
      if (roomData[room].players.length === 0) {
        delete roomData[room];
      }
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove the user from any room they were part of
    for (const room in roomData) {
      if (roomData[room].players.includes(socket.id)) {
        roomData[room].players = roomData[room].players.filter(
          (player) => player !== socket.id
        );
        
        io.to(room).emit("message", `User ${socket.id} disconnected`);
        io.to(room).emit("roomState", {
          players: roomData[room].players,
          choices: roomData[room].choices,
        });

        // Clean up room if empty
        if (roomData[room].players.length === 0) {
          delete roomData[room];
        }
      }
    }
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
