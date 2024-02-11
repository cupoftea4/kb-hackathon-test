import { fetchAuctionCategories } from "@/api/auction";
import AuctionForm from "@/components/AuctionForm"
import SessionWrapper from "@/components/SessionWrapper";
import { PageTop } from "@/components/PageTop";

const AuctionCreatePage = async () => {
  const categories = await fetchAuctionCategories();

  return (
    <>
      <SessionWrapper>
        <PageTop/>
      </SessionWrapper>
      <AuctionForm categories={categories}/>
    </>
  )
}

export default AuctionCreatePage;
