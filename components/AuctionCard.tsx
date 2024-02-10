import Image from 'next/image';

type OwnProps = {
  auction: Auction
}

const AuctionCard = ({ auction }: OwnProps) => {
  return (
    <div className='bg-backgroundOverlay px-4 py-4 rounded-lg'>
      <div className='flex gap-4 flex-col sm:flex-row'>
        <Image 
          src='/default-image.jpg' 
          width={500} height={500} 
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
            <span className='bg-accent text-white py-1 px-2 rounded-full w-fit text-xs'>charity</span>
          }
        </div>
      </div>
    </div>
  )
}

export default AuctionCard