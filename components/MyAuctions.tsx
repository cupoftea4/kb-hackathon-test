'use client';
import Auctions from '@/components/Auctions';
import { clientFetchJson } from '@/utils/clientFetchJson';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const MyAuctions = () => {
  const { data } = useSession();

  const [auctions, setAuctions] = useState([] as Auction[]);

  useEffect(() => {
    if (!data?.user?.email) return;
    clientFetchJson<Auction[]>(`auction?createdBy=${data?.user?.email}`).then((auctions) =>
      setAuctions(auctions)
    );
  }, [data?.user?.email]);

  return (
    <>
      <Auctions auctions={auctions} myAuctions={true} className="grid xl:grid-cols-2" />
    </>
  )
}

export default MyAuctions;
