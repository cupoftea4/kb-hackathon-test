"use client";
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import GoogleOneTap from './GoogleOneTap';

const GoogleOneTapWrapper = () => {
  return (
    <SessionProvider>
      <GoogleOneTap />
    </SessionProvider>
  )
}

export default GoogleOneTapWrapper;
