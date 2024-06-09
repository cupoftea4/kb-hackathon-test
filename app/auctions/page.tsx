import { fetchActions, fetchAuctionCategories } from "@/api/auction";
import AuctionsFilterer from "@/components/AuctionsFilterer";

const AuctionsPage = async () => {
  const auctions = await fetchActions();
  const categories = await fetchAuctionCategories();

  return (
    <main>
      <div className="relative">
        <AuctionsFilterer initAuctions={auctions} categories={categories} />
      </div>
    </main>
  );
}

export default AuctionsPage;