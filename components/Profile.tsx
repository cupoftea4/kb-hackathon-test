'use client';
import { useSession } from "next-auth/react";
import Image from "next/image"

const Profile = () => {
  const { data } = useSession();
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-8 sm:p-0 p-5 sm:justify-normal justify-center">
        <Image
          src={data?.user?.image || '/default-avatar.png'}
          alt={data?.user?.name! || 'default'}
          width={80}
          height={80}
          className='rounded-full self-center'
        />
        <div className="flex flex-col gap-2 justify-center">
          <h1 className="font-bold sm:text-2xl text-xl">{data?.user?.name}</h1>
          <p className="font-medium sm:text-lg text-base">{data?.user?.email}</p>
        </div>
      </div>
    </>
  )
}

export default Profile;
