import AuctionInfo from '@/components/AuctionInfo';
import Bids from '@/components/Bids';
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
  console.log(auction);

  return (
    <div className='flex flex-col gap-4'>
      <SessionWrapper>
        <PageTop />
      </SessionWrapper>
      <div className='lg:px-8'>
        <AuctionInfo auction={auction} authToken={authToken}/>
        <Bids auction={auction} />
      </div>
      
    </div>
  )
}

export default AuctionPage;
