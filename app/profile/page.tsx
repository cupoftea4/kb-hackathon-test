import HomeIcon from "@/assets/HomeIcon";
import SessionWrapper from "@/components/SessionWrapper";
import Link from "next/link";
import Profile from "@/components/Profile";
import { fetchJson } from "@/utils/fetchJson";
import AuctionCard from "@/components/AuctionCard";

const ProfilePage = async () => {
  const auctions = await fetchJson<Auction[]>('auction');
  
  return (
    <main>
      <div className="flex p-5">
        <Link href="/auctions">
          <HomeIcon />
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <SessionWrapper>
          <Profile />
        </SessionWrapper>
      </div>
      <div className="flex flex-col justify-start items-start sm:px-40 sm:py-5 px-4 gap-4">
        <h2 className="font-bold text-xl">My auctions</h2>
        <div className="flex justify-start items-start flex-col gap-4 flex-1">
          {auctions.map((auction: Auction) => (
            <AuctionCard auction={auction} key={auction._id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
