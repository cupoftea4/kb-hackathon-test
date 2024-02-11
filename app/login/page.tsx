'use client';
import SessionWrapper from "@/components/SessionWrapper";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const _Login = () => {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center h-full">
      <Button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign in with Google
      </Button>
      {session && (
        <>
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
  )
}

const Login = () => {
  return (
    <SessionWrapper>
      <_Login />
    </SessionWrapper>
  )
}

export default Login;
