# Socket.IO Projects

This repository showcases my journey of learning and implementing real-time communication with Socket.IO. The projects included here demonstrate various use cases of WebSockets and Socket.IO, from a basic chat application to a multiplayer game.

---

## Projects Included

### 1. Chat App
A real-time chat application built using Socket.IO. This project follows the basic principles of WebSocket communication, allowing users to exchange messages in real time.

#### Features:
- Real-time messaging.
- User notifications when someone connects or disconnects.

#### Tech Stack:
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express, Socket.IO

#### How to Run:
1. Navigate to the `chat-app` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open `index.html` in a browser to use the application.

---

### 2. Rock-Paper-Scissors Multiplayer Game
A real-time online multiplayer game of Rock-Paper-Scissors. This project emphasizes the use of Socket.IO for managing multiple user connections, game logic, and real-time updates.

#### Features:
- Online multiplayer gameplay.
- Room-based matchmaking.
- Real-time game updates and score tracking.

#### Tech Stack:
- **Frontend:** React, CSS (to be enhanced further)
- **Backend:** Node.js, Express, Socket.IO

#### How to Run:
1. Navigate to the `rock-paper-scissors` directory.
2. Install dependencies for the server and client:
   ```bash
   cd server
   npm install
   cd ../client
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Start the client:
   ```bash
   npm run dev
   ```
5. Access the application at `http://localhost:5173`.

---

## Repository Structure
```
socket-io-projects/
├── chat-app/
│   ├── server/
│   │   ├── server.js
│   │   └── package.json
│   ├── client/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   └── README.md
├── rock-paper-scissors/
│   ├── server/
│   │   ├── server.js
│   │   └── package.json
│   ├── client/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── App.js
│   │   │   └── index.js
│   │   ├── public/
│   │   │   └── index.html
│   │   └── package.json
│   └── README.md
└── README.md
```

---

## Future Enhancements
- Improve the UI/UX of the Rock-Paper-Scissors game.
- Add advanced features like room-based chat or game statistics.
- Deploy the projects online for public access.

---

## Learning Goals
These projects serve as stepping stones for mastering real-time web development and building scalable real-time applications using Socket.IO and WebSockets.

---

## Contributions
Suggestions and contributions are welcome! Feel free to create an issue or submit a pull request.

---

## License
This repository is licensed under the [MIT License](LICENSE).

