import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'

export const PageTop = () => {
  const { data } = useSession();
  return (
    <div className='flex p-5 gap-2'>
      <Link href='/profile'>
        <Image
          src={data?.user?.image || '/default-avatar.png'}
          alt={data?.user?.name! || 'default'}
          width={70}
          height={70}
        />
      </Link>
      { /* pop-up here */}
    </div>
  )
}
