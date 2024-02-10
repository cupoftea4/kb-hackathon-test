import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  const { data: session, status, update } = useSession();

  // Client side fetch example
  useEffect(() => {
    const res = fetch('http://localhost:5005/bid', {
      method: 'GET',
      credentials: 'include', // Send cookies with jwt token
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(json =>
      console.log(json)
    )
  }, [])

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
