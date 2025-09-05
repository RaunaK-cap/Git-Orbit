"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter() 
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        <Button className=" bg-orange-400 text-white"> Git-Orbit sent it</Button>
      </div>
      <div>
        <Button onClick={()=>{
          router.push("/sign-in")
        }} >
          Sign In
        </Button>
      </div>
    </div>
  );
}
