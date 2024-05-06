import Image from "next/image";
import MyComponent from "./MyComponent";
import { getSession } from "@/utils/Lib";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  console.log(session);

  redirect("/home");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
