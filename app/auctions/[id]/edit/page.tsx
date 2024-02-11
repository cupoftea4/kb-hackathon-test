import { fetchAuctionCategories } from "@/api/auction";
import AuctionForm from "@/components/AuctionForm"
import SessionWrapper from "@/components/SessionWrapper";
import { fetchJson } from '@/utils/fetchJson';
import { getPathname } from '@/utils/url';
import { PageTop } from "@/components/PageTop";

const AuctionEdit = async () => {
  const categories = await fetchAuctionCategories();
  const pathname = getPathname();
  const id = pathname!.split('/')[2];

  const auction = await fetchJson<Auction>(`auction/${id}`);

  return (
    <>
      <SessionWrapper>
        <PageTop />
      </SessionWrapper>
      <AuctionForm categories={categories} isEditing={true} auctionData={auction} />
    </>
  )
}

export default AuctionEdit
