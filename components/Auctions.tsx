import { cn } from "@/lib/utils"
import AuctionCard from "./AuctionCard"
import Image from "next/image"

type OwnProps = {
  auctions: Auction[]
  showOnlyCharityAuctions?: boolean
  myAuctions?: boolean
  className?: string
}

const Auctions = ({ auctions, myAuctions, className }: OwnProps) => {
  return (
    <div className={cn("flex flex-col gap-4 flex-1 flex-wrap sm:flex-row", className)}>
      {auctions
        .sort((a, b) => new Date(b.updatedAt ?? 0).getTime() - new Date(a.updatedAt ?? 0).getTime())
        .map((auction) => (
        <AuctionCard auction={auction} key={auction._id} editable={myAuctions} />
      ))}
      {auctions.length === 0 && 
        <div className="flex flex-col flex-1 items-center gap-2">
          <Image src="/no-auctions.png" width={1920} height={1080} alt="No auctions found" />
          <p className="text-center text-2xl font-semibold">No auctions found</p>
        </div>
      }
    </div>
  )
}

export default Auctions;
