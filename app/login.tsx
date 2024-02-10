"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function Login() {
  const { data: session, status, update } = useSession();
  console.log(session);
  console.log(status);
  console.log(update);
  return (
    <div>
      <Button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign in with Google
      </Button>
      {/* Check if the user is logged in */}
      {session && (
        <>
          <p>Signed in as {session.user?.email}</p>
          <Button
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </Button>
        </>
      )
      }
    </div>
  );
}
