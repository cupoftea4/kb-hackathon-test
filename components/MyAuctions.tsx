'use client';
import Auctions from '@/components/Auctions';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

const MyAuctions = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const firstRender = useRef(true);
  const { data } = useSession();

  const [auctions, setAuctions] = useState(initAuctions);
  const [filters, setFilters] = useState<AuctionSearchParams>({});

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
  }, []);

  const applyFilters = () => {
    const qb = new URLSearchParams(`createdBy=${data?.user?.}`);
    const path = pathname + ((Object.keys(filters).length > 0) ? "?" + qb.toString() : "");
    router.push(path);
  };

  return (
    <>
    <Auctions auctions={auctions} myAuctions={true} className="grid xl:grid-cols-2"/>
    </>
  )
}

export default MyAuctions;
