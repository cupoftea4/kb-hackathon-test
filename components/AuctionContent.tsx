"use client";
import React, { useEffect, useState } from 'react'
import AuctionInfo from './AuctionInfo'
import Bids from './Bids'
import { connect } from '@/utils/socket';
import { toast } from 'sonner';

type OwnProps = {
  auction: AuctionWithBids
  authToken?: string
}

const AuctionContent = ({ auction, authToken }: OwnProps) => {
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (!authToken) return;
    connect(auction._id, authToken)
      .then(() => {
        setSocketConnected(true);
      })
      .catch(() => {
        toast.error('Failed to connect to WebSocket server');
      });
  }, [auction._id, authToken]);

  return (
    <div className='lg:px-8'>
      <AuctionInfo auction={auction} socketConnected={socketConnected} />
      <Bids auction={auction} socketConnected={socketConnected} />
    </div>
  )
}

export default AuctionContent