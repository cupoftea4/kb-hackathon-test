'use client';
import HomeIcon from '@/assets/HomeIcon';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'

export const PageTop = () => {
  const { data } = useSession();
  return (
    <div className='flex p-5 justify-between'>
      <Link href="/auctions">
        <HomeIcon />
      </Link>
      <Link href='/profile'>
        <Image
          src={data?.user?.image || '/default-avatar.png'}
          alt={data?.user?.name! || 'default'}
          width={60}
          height={60}
          className='rounded-full'
        />
      </Link>
    </div>
  )
}
