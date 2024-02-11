import { Socket, io } from "socket.io-client";

let socket: Socket;

export const connect = (auctionId: string, token: string): Promise<string> => {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('Missing NEXT_PUBLIC_API_URL');
  }

  socket = io(process.env.NEXT_PUBLIC_API_URL, { 
    query: { 
      auction: auctionId,
      auth_token: token
    } 
  });

  socket.on('error', (error: any) => {
    console.error('WebSocket error', error);
  });

  return new Promise((resolve, reject) => {
    socket.on('connected', () => {
      console.log('Connected to WebSocket server');
      resolve("");
    });

    socket.on('error', (error: any) => {
      console.error('WebSocket error', error);
      reject('Failed to connect to WebSocket server' + error);
    });
  });
}

export const emitNewBid = (bid: { auction: string, amount: number }): Promise<string> => {
  if (!socket) {
    throw new Error('You must call "connect" before emitting new bids');
  }

  return new Promise((resolve, reject) => {
    socket.emit('createBid', {
      ...bid,
      createdAt: new Date()
    }, (success: boolean) => {
      if (success) {
        resolve("");
      } else {
        reject('Failed to create bid');
      }
    });
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

export const unsubscribeFromNewBids = () => {
  if (!socket) {
    throw new Error('You must call "connect" before unsubscribing from new bids');
  }

  socket.off('newBid');
}

export const disconnect = () => {
  console.log('Disconnected from WebSocket server');
}
