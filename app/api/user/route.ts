import { Options } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(Options);

  if (session) {
    return new Response(JSON.stringify(session), { status: 200 });
  } else {
    return new Response("Not authenticated user!", { status: 401 });
  }
}