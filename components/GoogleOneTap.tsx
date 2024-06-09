'use client';
import useOneTapSignin from '@/hooks/useOneTapSignin';

const ONE_TAP_ID = 'oneTap';

const GoogleOneTap = () => {
  useOneTapSignin({
    redirect: true,
    parentContainerId: ONE_TAP_ID,
  });

  return (
    <>
      <div id={ONE_TAP_ID} style={{ position: 'fixed', top: '20px', right: '0', zIndex: '99' }} />
    </>
  )
}

export default GoogleOneTap;
