"use client";
import HomeTop from "@/components/HomeTop";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
import Login from "./login";

export default function Home() {
  return (
    <main>
      <div className="max-w-screen-xl m-auto">
        <HomeTop />
        <SessionProvider>
          <Login />
        </SessionProvider>
      </div>
    </main>
  );
}
