import HomeIcon from "@/assets/HomeIcon";
import SessionWrapper from "@/components/SessionWrapper";
import Link from "next/link";
import Profile from "@/components/Profile";
import { fetchJson } from "@/utils/fetchJson";
import Auctions from "@/components/Auctions";
import { PageTop } from "@/components/PageTop";

const ProfilePage = async () => {
  const auctions = await fetchJson<Auction[]>('auction');

  return (
    <main>
      <SessionWrapper>
        <PageTop />
      </SessionWrapper>
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
        <Auctions auctions={auctions} />
      </div>
    </main>
  );
}

export default ProfilePage;
