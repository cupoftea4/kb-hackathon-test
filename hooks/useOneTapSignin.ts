"use client";
import { useEffect, useState } from 'react';
import { useSession, signIn, SignInOptions } from 'next-auth/react';
import { CLIENT_ID } from '@/constants';

interface OneTapSigninOptions {
  parentContainerId?: string;
}

const useOneTapSignin = (
  opt?: OneTapSigninOptions & Pick<SignInOptions, 'redirect' | 'callbackUrl'>
) => {
  const { status } = useSession();
  const isSignedIn = status === 'authenticated';
  const { parentContainerId } = opt || {};
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      const { google } = window as any;
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
          callback: async (response: any) => {
            setIsLoading(true);

            // Here we call our Provider with the token provided by google
            await signIn('googleonetap', {
              credential: response.credential,
              redirect: true,
              ...opt,
            });
            setIsLoading(false);
          },
          prompt_parent_id: parentContainerId,
          style:
            'position: absolute; top: 100px; right: 30px;width: 0; height: 0; z-index: 1001;',
        });

        // Here we just console.log some error situations and reason why the google one tap
        // is not displayed. You may want to handle it depending on yuor application
        google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed()) {
            console.log(notification.getNotDisplayedReason());
          } else if (notification.isSkippedMoment()) {
            console.log(notification.getSkippedReason());
          } else if (notification.isDismissedMoment()) {
            console.log(notification.getDismissedReason());
          }
        });
      }
    }
  }, [isLoading, isSignedIn, opt, parentContainerId]);

  return { isLoading };
};

export default useOneTapSignin;
