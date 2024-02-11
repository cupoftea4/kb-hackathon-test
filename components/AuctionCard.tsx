import Image from 'next/image';
import { Badge } from './ui/badge';
import Link from 'next/link';

type OwnProps = {
  auction: Auction
}

const AuctionCard = ({ auction }: OwnProps) => {
  return (
    <Link href={`/auctions/${auction._id}`}>
      <div className='bg-backgroundOverlay px-4 py-4 rounded-lg'>
        <div className='flex gap-4 flex-col sm:flex-row'>
          <Image 
            src='/default-image.jpg' 
            width={500} height={305} 
            alt={auction.product.name} 
            className='object-cover aspect-square rounded-md w-full sm:max-w-32' 
          />
          <div className='py-1 flex flex-col'>
            <span className='text-xl font-semibold'>{auction.product.name}</span>
            <div className='flex-grow'>
              {auction.product.category}
              <div>
                <span className='text-primary'>{auction.currency}</span>
                <span className='text-lg font-semibold'>{}</span>
              </div>          
            </div>
            {auction.charity && 
              <Badge>charity</Badge>
            }
          </div>
        </div>
      </div>
    </Link>
  )
}

export default AuctionCard
