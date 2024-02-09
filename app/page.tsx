import HomeTop from "@/components/HomeTop";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="max-w-screen-xl m-auto">
        <HomeTop />
      </div>
    </main>
  );
}
