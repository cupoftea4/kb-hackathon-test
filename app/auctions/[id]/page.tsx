import { fetchJson } from '@/utils/fetchJson';
import { getPathname } from '@/utils/url';
import React from 'react'

const AuctionPage = async () => {
  const pathname = getPathname();
  const id = pathname!.split('/')[2];

  const auction = await fetchJson<AuctionWithBids>(`auction/${id}`);
  console.log(auction);

  return (
    <div>page</div>
  )
}

export default AuctionPage;
