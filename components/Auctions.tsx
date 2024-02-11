import AuctionCard from "./AuctionCard"

type OwnProps = {
  auctions: Auction[]
  showOnlyCharityAuctions?: boolean
  myAuctions?: boolean
}

const Auctions = ({ auctions, myAuctions }: OwnProps) => {
  return (
    <div className="flex flex-col gap-4 flex-1 flex-wrap sm:flex-row">
      {auctions.map((auction) => (
        <AuctionCard auction={auction} key={auction._id} editable={myAuctions} />
      ))}
    </div>
  )
}

export default Auctions;
