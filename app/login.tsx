import { useEffect } from "react";

function Login() {
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
  
  return (
    <></>
  );
}
