"use client";
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Badge } from './ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner';
import { connect } from '@/utils/socket';

type OwnProps = {
  auction: AuctionWithBids
  authToken?: string
}

const AuctionInfo = ({ auction, authToken }: OwnProps) => {
  const lastPrice = useMemo(() => {
    return auction.bids.sort((a, b) => b.createdAt.getSeconds() - a.createdAt.getSeconds())[0].amount
  }, [auction.bids]);

  const [bid, setBid] = useState<number>(lastPrice + 100);
  
  useEffect(() => {
    if (!authToken) return;
    connect(auction._id, authToken);
  }, [auction._id, authToken]);

  return (
    <div className='flex flex-1 flex-col sm:flex-row p-2 gap-6 items-center sm:items-start'>
      <Image 
        src={'/default-image.jpg'} 
        alt={auction.product.name} 
        width={300} height={300} 
        style={{objectFit: 'cover', aspectRatio: '1/1', maxWidth: '300px'}}
        className='rounded-lg' 
      />
      <div className='flex flex-1 flex-col gap-4'>
        <div>
          <h1 className='text-3xl font-bold'>{auction.product.name}</h1>
          <p className='text-xl'>Category: {auction.product.category}</p>
          <p className='text-xl'>Current price: {lastPrice}</p>
          <p className='text-xl'>Ends at: {new Date().toLocaleString()}</p>
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
                toast.success('Bid placed');
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