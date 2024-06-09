"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  emitNewBid,
  subscribeToNewBids,
  unsubscribeFromNewBids,
} from "@/utils/socket";
import { cn } from "@/lib/utils";

type OwnProps = {
  auction: AuctionWithBids;
  socketConnected: boolean;
};

const AuctionInfo = ({ auction, socketConnected }: OwnProps) => {
  const [lastPrice, setLastPrice] = useState<number>(
    auction.bids.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]?.amount ?? auction.minPrice
  );

  const [bid, setBid] = useState<number>(lastPrice + 100);
  const [isLoading, setIsLoading] = useState(false);

  const closeDate = auction.closeDate
    ? new Date(auction.closeDate ?? "") > new Date()
      ? new Date(auction.closeDate).toLocaleDateString()
      : "closed"
    : "soon";

  const handleBid = async (amount: number) => {
    setIsLoading(true);
    if (amount < lastPrice + (auction.minBidStep ?? 100)) {
      toast.error("Bid too low");
    } else {
      emitNewBid({ amount, auction: auction._id })
        .then(() => {
          toast.success("Bid placed");
        })
        .catch(() => {
          toast.error("Error placing bid");
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!socketConnected) return;
    subscribeToNewBids((newBid) => {
      setLastPrice(newBid.amount);
    });

    return () => {
      unsubscribeFromNewBids();
    };
  }, [socketConnected]);

  useEffect(() => {
    setBid(lastPrice + (auction.minBidStep ?? 100));
  }, [auction.minBidStep, lastPrice]);

  return (
    <div className="flex flex-1 flex-col sm:flex-row p-2 gap-6 items-center sm:items-start">
      <Image
        src={auction.picture?.url ?? "/default-image.jpg"}
        alt={auction.product.name}
        width={300}
        height={300}
        style={{ objectFit: "cover", aspectRatio: "1/1", maxWidth: "300px" }}
        className="rounded-lg"
      />
      <div className="flex flex-1 flex-col gap-4 justify-between content-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{auction.product.name}</h1>
          <p className="text-xl">Category: {auction.product.category.name}</p>
          <p className="text-xl">Current price: {lastPrice} {auction.currency}</p>
          <p className="text-xl flex items-center gap-2">
            Ends at: <span className={cn(
              closeDate === "closed" && "bg-red-500 text-white px-2 py-1 rounded-xl flex max-w-max",
            )}>{closeDate}</span>
          </p>
          {auction.charity && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-fit">
                  <Badge>charity</Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>This item is being auctioned for charity</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <div className="p-4">
          <Input
            placeholder="Bid"
            type="number"
            value={bid}
            onChange={(e) => setBid(Number(e.target.value))}
          />
          <Button disabled={!socketConnected || closeDate === "closed"} onClick={() => handleBid(bid)}>
            {isLoading ? (
              <div className="w-[4.25rem]">
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                >
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              </div>
            ) : (
              "Place bid"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuctionInfo;
