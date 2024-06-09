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
    if (!isSignedIn && !isLoading) {
      const { google } = window as any;
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
          cancel_on_tap_outside: false, // Disable the tap outside of the One Tap button
          callback: async (response: any) => {
            setIsLoading(true);
            try {
              await signIn('googleonetap', {
                credential: response.credential,
                ...opt,
              });
            } catch (error) {
              console.error('One Tap sign-in error:', error);
            } finally {
              setIsLoading(false);
            }
          },
          prompt_parent_id: parentContainerId,
          use_fedcm_for_prompt: true,
          context: 'use',
        });

        google.accounts.id.prompt((notification: any) => {
          console.log('One Tap prompt notification:', notification.getMomentType());

          if (notification.isDismissedMoment()) {
            console.log('One Tap dismissed:', notification.getDismissedReason());
            if (notification.getDismissedReason() === 'credential_returned') {
              console.log('One Tap sign-in dismissed');
              setIsLoading(false);
            }
          }
        });
      } else {
        console.log('Google One Tap not found');
        setIsLoading(false);
        return;
      }
    }
  }, [isLoading, isSignedIn, opt, parentContainerId, status]);

  return { isLoading };
};

export default useOneTapSignin;
