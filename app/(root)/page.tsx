import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return <HomeClient />;
}
