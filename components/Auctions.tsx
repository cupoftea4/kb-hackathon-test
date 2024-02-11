import { memo } from "react"
import AuctionCard from "./AuctionCard"

type OwnProps = {
  auctions: Auction[]
  showOnlyCharityAuctions?: boolean
}

const Auctions = ({ auctions }: OwnProps) => {
  return (
    <div className="flex flex-col gap-4 flex-1">
      {auctions.map((auction) => (
        <AuctionCard auction={auction} key={auction._id} />
      ))}
    </div>
  )
}

export default Auctions;
