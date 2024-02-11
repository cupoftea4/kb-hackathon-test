import { Socket, io } from "socket.io-client";

let socket: Socket;

export const connect = (auctionId: string, token: string) => {
  socket = io('http://localhost:5005', { 
    query: { 
      auction: auctionId,
      auth_token: token
    } 
  });

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('error', (error: any) => {
    console.error('WebSocket error', error);
  });
}

export const emitNewBid = (bid: { auction: string, amount: number }) => {
  if (!socket) {
    throw new Error('You must call "connect" before emitting new bids');
  }

  socket.emit('createBid', {
    ...bid,
    createdAt: new Date()
  });
}


export const subscribeToNewBids = (cb: (bid: Bid) => void) => {
  if (!socket) {
    throw new Error('You must call "connect" before subscribing to new bids');
  }

  socket.on('newBid', (bid: Bid) => {
    cb(bid);
  });
}

export const disconnect = () => {
  console.log('Disconnected from WebSocket server');
}
