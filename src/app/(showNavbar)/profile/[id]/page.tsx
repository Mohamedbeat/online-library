import { Button } from "@/components/ui/button";
import { getProfileById, getSession } from "@/utils/Lib";
import { Item } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import React from "react";
import { UserRoundCog, SquarePlus } from "lucide-react";
import { it } from "node:test";

async function ProfilePage({ params }: { params: { id: string } }) {
  // console.log(params.id);
  const session = await getSession();

  const profile = await getProfileById(params.id);
  console.log(profile);

  const isProfileOwner = session.payload.id === profile?.id;

  return (
    <div>
      {/* Profile data */}
      <div className="w-full flex flex-col items-center justify-center">
        {/* pic */}
        <div className="w-[100px] h-[100px] bg-blue-300 rounded-full flex items-center justify-center text-[30px] capitalize font-semibold">
          {profile?.name.charAt(0)}
        </div>
        {/* name */}
        <div className="mt-4 text-[20px] font-semibold capitalize">
          {profile?.name}{" "}
          {isProfileOwner && (
            <Button variant={"secondary"}>
              <UserRoundCog />
            </Button>
          )}
        </div>
        {/* bio */}
        <div className="mt-4 border-y-2 py-2 rounded-md px-4 ">
          <div className="w-full text-center">Bio</div>
          <div>{profile?.bio}</div>
        </div>
        <div className="w-full md:w-1/2  flex mt-4 text-center">
          <div className="w-1/2 border-r-[1px] p-2">
            <div>Joined us on :</div>
            <div className="mt-2">
              {profile?.createdAt.toLocaleDateString()}
            </div>
          </div>
          <div className="w-1/2 border-l-[1px] p-2">
            <div className="">Articles</div>
            <div className="font-semibold text-[18px] mt-2">
              {profile?.Article.length}
            </div>
          </div>
        </div>
      </div>
      {/* articles */}
      <div className="w-full flex justify-between font-semibold text-[18px] border-b-2 rounded-md py-3 px-[20px] md:px-0">
        <p>Articles</p>
        <Link className="hidden md:block" href={"/articles/new"}>
          <Button className="flex gap-2">
            {" "}
            <SquarePlus /> New article
          </Button>
        </Link>
      </div>
      <div className=" mt-4 w-full gap-3 flex  flex-col md:grid md:grid-cols-3  md:flex-row md:flex-wrap items-center justify-start px-[20px]">
        {profile?.Article.map((item) => {
          return (
            <Link
              href={"/articles/" + item.id}
              key={item.id}
              className="w-full md:w-max group rounded-md p-2 px-4 hover:bg-slate-200 cursor-pointer transition-all duration-200"
            >
              <div className="group-hover:underline mt-2">{item.title}</div>
              <div className="mt-2">{item.createdAt.toLocaleDateString()}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProfilePage;
