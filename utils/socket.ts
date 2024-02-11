import { io } from "socket.io-client";

export const connect = (auctionId: string, token: string) => {
  const socket = io('http://localhost:5005', { 
    query: { 
      auction: auctionId,
      token
    } 
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });
}
