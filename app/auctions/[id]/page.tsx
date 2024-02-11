import AuctionInfo from '@/components/AuctionInfo';
import { PageTop } from '@/components/PageTop';
import SessionWrapper from '@/components/SessionWrapper';
import { fetchJson } from '@/utils/fetchJson';
import { getPathname } from '@/utils/url';
import { cookies } from 'next/headers';
import React from 'react'

const AuctionPage = async () => {
  const pathname = getPathname();
  const authToken = cookies().get('auth_token')?.value;
  const id = pathname!.split('/')[2];

  const auction = await fetchJson<AuctionWithBids>(`auction/${id}`);

  return (
    <div className='flex flex-col gap-4'>
      <SessionWrapper>
        <PageTop />
      </SessionWrapper>
      <div className='lg:px-8'>
        <AuctionInfo auction={auction} authToken={authToken}/>
        <div>
          <h1 className='text-3xl font-bold'>Bids</h1>
          <ul className='flex '>
            {auction.bids.map(bid => (
              <li key={bid._id}>
                <p>{bid.createdBy.name}</p>
                <p>{bid.amount}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default AuctionPage;
