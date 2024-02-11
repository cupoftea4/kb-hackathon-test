"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import Auctions from "@/components/Auctions";
import Filters from "@/components/Filters";
import { Button } from "@/components/ui/button";
import { AuctionSearchParams } from '@/types/general';
import { clientFetchJson } from '@/utils/clientFetchJson';
import HomeTop from './HomeTop';
import SessionWrapper from './SessionWrapper';

type OwnProps = {
  initAuctions: Auction[]
}

const fetchAuctions = (params: ReadonlyURLSearchParams) => {
  const qb = new URLSearchParams(params);
  const path = qb.toString() === "" ? "auction" : `auction?${qb.toString()}`;
  return clientFetchJson<Auction[]>(path);
}

export default function AuctionsFilterer({ initAuctions }: OwnProps) {
  const [auctions, setAuctions] = useState(initAuctions);
  const [filters, setFilters] = useState<AuctionSearchParams>({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const firstRender = useRef(true);

  useEffect(() => {
    const fetchFilteredAuctions = async () => {
      const auctions = await fetchAuctions(searchParams);
      setAuctions(auctions);
    };

    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    fetchFilteredAuctions();
  }, [searchParams]);

  const applyFilters = (filters: AuctionSearchParams) => {
    const qb = new URLSearchParams(filters);
    const path = pathname + ((Object.keys(filters).length > 0) ? "?" + qb.toString() : "");
    router.push(path);
  };

  const onFilterChange = useCallback(<T extends keyof AuctionSearchParams>(
    changedProp: T,
    value: AuctionSearchParams[T]
  ) => {
    if (value === "") {
      // Remove the filter from the list
      setFilters(prev => {
        const { [changedProp]: _, ...rest } = prev;
        return rest;
      });
      return;
    }
    setFilters(prev => ({
      ...prev,
      [changedProp]: value
    }));
  }, []);

  return (
    <>
      <SessionWrapper>
        <HomeTop />
      </SessionWrapper>
      <div className="flex flex-col max-w-screen-lg m-auto sm:flex-row-reverse px-4 gap-4">
        <div className="flex flex-col gap-2">
          <Filters
            onFilterChange={onFilterChange}
          />
          <Button className="w-full" onClick={() => applyFilters(filters)}>Apply filters</Button>
        </div>
        <Auctions auctions={auctions} />
      </div>
    </>
  );
}
