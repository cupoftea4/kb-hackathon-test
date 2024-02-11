import { fetchActions, fetchAuctionCategories } from "@/api/auction";
import AuctionsFilterer from "@/components/AuctionsFilterer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuctionsPage = async () => {
  const auctions = await fetchActions();
  const categories = await fetchAuctionCategories();
  console.log(categories);

  return (
    <main>
      <div className="relative">
        <AuctionsFilterer initAuctions={auctions} categories={categories} />
        <Link href="/auctions/create">
          <Button
            className="sticky bottom-0 w-full sm:w-auto sm:bottom-8 left-[80%] rounded-none sm:rounded-md"
          >
            Create Auction
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default AuctionsPage;