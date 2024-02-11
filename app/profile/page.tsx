import HomeIcon from "@/assets/HomeIcon";
import SessionWrapper from "@/components/SessionWrapper";
import Link from "next/link";
import Profile from "@/components/Profile";
import Auctions from "@/components/Auctions"; 
import { fetchActions } from "@/api/auction";

const ProfilePage = async () => {
  const auctions = await fetchActions();
  
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
        <h2 className="font-bold text-xl sm:px-40 sm:py-4 px-4">My auctions</h2>
      <div className="sm:px-24 px-4">
        <Auctions auctions={auctions} myAuctions={true} className="grid xl:grid-cols-2"/>
      </div>
    </main>
  );
}

export default ProfilePage;
