"use client"
import Image from 'next/image'
import SearchIcon from '@/assets/SearchIcon'
import { Input } from './ui/input'
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const HomeTop = () => {
  const { data } = useSession();

  return (
    <div className='flex p-5 gap-2'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='w-fit flex items-center border-2 px-2 rounded-md'>
          <Input placeholder='Search' className='inline-block' />
          <SearchIcon />
        </div>
      </div>
      <Link href='/profile'>
        <Image
          src={data?.user?.image || '/default-avatar.png'}
          alt={data?.user?.name! || 'default'}
          width={60}
          height={60}
          className='rounded-full cursor-pointer'
        />
      </Link>
    </div >
  )
}

export default HomeTop;
