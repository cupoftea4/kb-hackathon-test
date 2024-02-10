"use client";
import HomeTop from "@/components/HomeTop";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Login from "./login";
import Script from "next/script";

export default function Home() {
  return (
    <main>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      <div className="max-w-screen-xl m-auto">
        <HomeTop />
      </div>
    </main>
  );
}
