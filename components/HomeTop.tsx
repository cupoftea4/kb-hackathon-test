import React from 'react'
import Image from 'next/image'
import SearchIcon from '@/assets/SearchIcon'
import { Input } from './ui/input'

const HomeTop = () => {
  return (
    <div className='flex p-5 gap-2'>
      <div className='flex-1 flex justify-center items-center'>
        <div className='w-fit flex items-center border-2 px-2 rounded-md'>
          <Input placeholder='Search' className='inline-block' />
          <SearchIcon />
        </div>
      </div>
      <Image src='/default-avatar.png' alt='Avatar image' width={70} height={70} />
    </div>
  )
}

export default HomeTop;
