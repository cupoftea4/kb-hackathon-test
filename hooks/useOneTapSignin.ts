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
  const [requestInProgress, setRequestInProgress] = useState(false);

  useEffect(() => {
    if (document.cookie.includes('g_state')) {
      console.log('Google One Tap cookie found');
      if(parentContainerId) {
        document.getElementById(parentContainerId)?.remove();
      }
      setIsLoading(false);
      return;
    }

    if (!isLoading && !isSignedIn) {
      const { google } = window as any;
      if (google) {
        console.log('Google One Tap found');
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
          cancel_on_tap_outside: false, // Disable the tap outside of the One Tap button
          callback: async (response: any) => {
            setIsLoading(true);
            console.log('One Tap response received:', response);
            try {
              await signIn('googleonetap', {
                credential: response.credential,
                redirect: true,
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

        console.log('google', google);
        google.accounts.id.renderButton(document.getElementById(parentContainerId), {
          size: 'large',
          color: 'white',
          callback: async (response: any) => {
            setIsLoading(true);
            console.log('One Tap response received:', response);
            try {
              await signIn('googleonetap', {
                credential: response.credential,
                redirect: true,
                ...opt,
              });
            } catch (error) {
              console.error('One Tap sign-in error:', error);
            } finally {
              if(parentContainerId) {
                document.getElementById(parentContainerId)?.remove();
              }
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
  }, [isLoading, isSignedIn, opt, parentContainerId, requestInProgress, status]);

  return { isLoading };
};

export default useOneTapSignin;
