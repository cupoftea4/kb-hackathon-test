'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn, SignInOptions } from 'next-auth/react';

interface OneTapSigninOptions {
  parentContainerId?: string;
}

const useOneTapSignin = (opt?: OneTapSigninOptions & Pick<SignInOptions, 'redirect' | 'callbackUrl'>) => {
  const { status } = useSession();
  const isSignedIn = status === 'authenticated';
  const { parentContainerId } = opt || {};
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (document.cookie.includes('g_state')) {
      console.log('Google One Tap cookie found');
      setIsLoading(false);
      return;
    }

    if (!isLoading && !isSignedIn) {
      const { google } = window as any;
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
          cancel_on_tap_outside: false,
          callback: async (response: any) => {
            setIsLoading(true);
            console.log('One Tap response received:', response);

            await signIn('googleonetap', {
              credential: response.credential,
              redirect: true,
              ...opt,
            });

            setIsLoading(false);
          },
          prompt_parent_id: parentContainerId,
        });

        google.accounts.id.prompt((notification: any) => {
          console.log('One Tap prompt notification:', notification);

          if (notification.isNotDisplayed()) {
            console.log('One Tap not displayed:', notification.getNotDisplayedReason());
          } else if (notification.isSkippedMoment()) {
            console.log('One Tap skipped:', notification.getSkippedReason());
          } else if (notification.isDismissedMoment()) {
            console.log('One Tap dismissed:', notification.getDismissedReason());
            if (notification.getDismissedReason() === 'credential_returned') {
              console.log('One Tap sign-in dismissed');
              setIsLoading(false);
            }
          }
        });
      } else {
        console.log('Google object not found');
      }
    }
  }, [isLoading, isSignedIn, opt, parentContainerId, status]);

  return { isLoading };
};

export default useOneTapSignin;
