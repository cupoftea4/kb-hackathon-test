import Image from 'next/image';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { Button } from './ui/button';

type OwnProps = {
  auction: Auction
  editable?: boolean
}

const AuctionCard = ({ auction, editable }: OwnProps) => {
  return (
    <Link href={`/auctions/${auction._id}`}>
      <div className='bg-backgroundOverlay px-4 py-4 rounded-lg sm:w-[32rem]'>
        <div className='flex gap-4 flex-col sm:flex-row'>
          <Image
            src='/default-image.jpg'
            width={500} height={305}
            alt={auction.product.name}
            className='object-cover aspect-square rounded-md w-full sm:max-w-32'
          />
          <div className='flex justify-between w-full lg:min-w-2xl sm:items-stretch'>
            <div className='py-1 flex flex-col'>
              <span className='text-xl font-semibold'>{auction.product.name}</span>
              <div className='flex-grow'>
                {auction.product.category}
                <div>
                  <span className='text-primary'>{auction.currency}</span>
                  <span className='text-lg font-semibold'>{ }</span>
                </div>
              </div>
              {auction.charity &&
                <Badge>charity</Badge>
              }
            </div>
            <div className='flex justify-center items-center sm:px-6 px-2'>
              {editable &&
                <Button>Edit</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AuctionCard
