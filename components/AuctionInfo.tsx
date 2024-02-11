"use client";
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner';
import { connect, emitNewBid, subscribeToNewBids, unsubscribeFromNewBids } from '@/utils/socket';

type OwnProps = {
  auction: AuctionWithBids
  authToken?: string
}

const AuctionInfo = ({ auction, authToken }: OwnProps) => {
  const [lastPrice, setLastPrice] = useState<number>(auction.bids.sort((a, b) => {
    return new Date(b.createdAt).getSeconds() - new Date(a.createdAt).getSeconds()
  })[0]?.amount ?? 100);

  const [bid, setBid] = useState<number>(lastPrice + 100);
  
  useEffect(() => {
    if (!authToken) return;
    connect(auction._id, authToken);
  }, [auction._id, authToken]);

  useEffect(() => {
    subscribeToNewBids((newBid) => {
      setLastPrice(newBid.amount);
    });

    return () => {
      unsubscribeFromNewBids();
    }
  }, []);

  useEffect(() => {
    setBid(lastPrice + 100);
  }, [lastPrice]);

  return (
    <div className='flex flex-1 flex-col sm:flex-row p-2 gap-6 items-center sm:items-start'>
      <Image 
        src={'/default-image.jpg'} 
        alt={auction.product.name} 
        width={300} height={300} 
        style={{objectFit: 'cover', aspectRatio: '1/1', maxWidth: '300px'}}
        className='rounded-lg' 
      />
      <div className='flex flex-1 flex-col gap-4 justify-between content-between'>
        <div>
          <h1 className='text-3xl font-bold'>{auction.product.name}</h1>
          <p className='text-xl'>Category: {auction.product.category.name}</p>
          <p className='text-xl'>Current price: {lastPrice}</p>
          <p className='text-xl'>Ends at: {auction.closeDate ? new Date(auction.closeDate).toLocaleDateString() : "soon"}</p>
          {auction.charity && 
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className='w-fit'>
                  <Badge>charity</Badge> 
                </TooltipTrigger>
                <TooltipContent>
                  <p>This item is being auctioned for charity</p>
                </TooltipContent>
              </Tooltip>
          </TooltipProvider>
          }
        </div>
        <div className='p-4'>
          <Input placeholder='Bid' type='number' value={bid} onChange={(e) => setBid(Number(e.target.value))} />
          <Button
            onClick={() => {
              if (bid < lastPrice + 100) {
                toast.error('Bid too low');
              } else {
                emitNewBid({ amount: bid, auction: auction._id })
                  .then(() => {
                    toast.success('Bid placed');
                  }).catch(() => {
                    toast.error('Error placing bid');
                  });
              }
            }}
          >
            Place bid
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AuctionInfo