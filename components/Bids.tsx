"use client";
import { subscribeToNewBids, unsubscribeFromNewBids } from '@/utils/socket';
import React, { useEffect, useState } from 'react'

type OwnProps = {
  auction: AuctionWithBids
}

const Bids = ({ auction }: OwnProps) => {
  const [bids, setBids] = useState<Bid[]>(auction.bids);

  useEffect(() => {
    subscribeToNewBids((newBid) => {
      setBids(prev => [newBid, ...prev]);
    });

    return () => {
      unsubscribeFromNewBids();
    }
  }, []);
  
  return (
    <div className='bg-backgroundOverlay rounded-md p-2'>
      <h1 className='text-3xl font-bold'>Bids</h1>
      <ul className='flex h-48 m-h-48 overflow-auto flex-col-reverse'>
        {bids.map(bid => (
          <li key={bid._id} className='p-1'>
            <p><span className='text-accent'>{bid.createdBy.name}</span>: {bid.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Bids