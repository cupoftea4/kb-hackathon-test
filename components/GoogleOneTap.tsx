'use client';
import useOneTapSignin from '@/hooks/useOneTapSignin';
import React from 'react';

const ONE_TAP_ID = 'oneTap';

const GoogleOneTap = () => {
  useOneTapSignin({
    redirect: false,
    parentContainerId: ONE_TAP_ID,
  });

  return (
    <div id={ONE_TAP_ID} style={{ position: 'absolute', top: '20px', right: '0' }} />
  )
}

export default GoogleOneTap;
