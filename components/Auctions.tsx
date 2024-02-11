import { cn } from "@/lib/utils"
import AuctionCard from "./AuctionCard"

type OwnProps = {
  auctions: Auction[]
  showOnlyCharityAuctions?: boolean
  myAuctions?: boolean
  className?: string
}

const Auctions = ({ auctions, myAuctions, className }: OwnProps) => {
  return (
    <div className={cn("flex flex-col gap-4 flex-1 flex-wrap sm:flex-row", className)}>
      {auctions.map((auction) => (
        <AuctionCard auction={auction} key={auction._id} editable={myAuctions} />
      ))}
    </div>
  )
}

export default Auctions;
