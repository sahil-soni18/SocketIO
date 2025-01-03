import { io } from "socket.io-client";

const socket = io("http://localhost:3000");  // Ensure this is your server address

export default socket;
