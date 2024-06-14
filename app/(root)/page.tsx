import LeftSidebar from "@/components/shared/LeftSidebar";
import NewChat from "@/components/shared/NewChat";
import RightSideBar from "@/components/shared/RightSideBar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <main className=" grid grid-cols-6  ">
      <div className=" lg:col-span-1 col-span-0  lg:block hidden ">
        <LeftSidebar />
      </div>
      <div className=" lg:col-span-4 col-span-6">
        <NewChat />
      </div>
      <div className="lg:col-span-1 col-span-0 lg:block hidden">
        <RightSideBar />
      </div>
    </main>
  );
}
