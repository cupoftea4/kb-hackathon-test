'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';

const Profile = () => {
  const { data } = useSession();
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-8 sm:p-0 p-5 sm:justify-normal justify-center">
        {data && (
          <>
            <Image
              src={data?.user?.image || '/default-avatar.png'}
              alt={data?.user?.name! || 'default'}
              width={100}
              height={100}
              className='rounded-full self-center'
            />
            <div className="flex flex-col gap-2 justify-center">
              <h1 className="font-bold sm:text-2xl text-xl">{data?.user?.name}</h1>
              <p className="font-medium sm:text-lg text-base">{data?.user?.email}</p>
              <Button
                variant="destructive"
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </Button>
            </div>
          </>
        )}
        {!data && (
          <>
            <Skeleton className="h-[80px] w-[80px] rounded-full" />
            <div className="flex flex-col gap-2 justify-center">
              <div className="font-bold sm:text-2xl text-xl">
                <Skeleton className="h-[20px] w-[200px]" />
              </div>
              <div className="font-medium sm:text-lg text-base">
                <Skeleton className="h-[20px] w-[200px]" />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Profile;
