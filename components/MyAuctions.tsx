'use client';
import Auctions from '@/components/Auctions';
import { clientFetchJson } from '@/utils/clientFetchJson';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

const MyAuctions = () => {
  const { data } = useSession();

  const [auctions, setAuctions] = useState([] as Auction[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!data?.user?.email) return;
    setLoading(true);
    clientFetchJson<Auction[]>(`auction?createdBy=${data?.user?.email}`).then((auctions) =>
      setAuctions(auctions)
    ).finally(() => setLoading(false));
  }, [data?.user?.email]);

  return (
    <>
      {loading ? (
        <div className="grid xl:grid-cols-2 gap-4">
          <Skeleton className="h-[200px] w-[100%]" />
          <Skeleton className="h-[200px] w-[100%]" />
        </div>
      ) : (
        <Auctions auctions={auctions} myAuctions={true} className="grid xl:grid-cols-2" />
      )}
    </>
  )
}

export default MyAuctions;
