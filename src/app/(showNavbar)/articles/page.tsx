import { getAllArticles } from "@/utils/Lib";
import { Frown } from "lucide-react";
import Link from "next/link";
import React from "react";

async function AllArticlesPage() {
  const data = await getAllArticles();
  if (!data) {
    return (
      <div className="w-full h-screen text-[20px] font-bold flex gap-1 items-center justify-center">
        <p className="w-max"> Sorry Somthing worng </p> <Frown /> <p> !</p>
      </div>
    );
  } else if (data.length === 0) {
    return (
      <div className="w-full h-screen text-[20px] font-bold flex gap-1 items-center justify-center">
        <p className="w-max"> No results sorry </p> <Frown /> <p> !</p>
      </div>
    );
  } else {
    // console.log(data);

    return (
      <div>
        {data.map((item) => {
          return (
            <Link
              href={`/articles/${item.id}`}
              className="w-full flex flex-col gap-2 rounded-md border-b-[2px] border-slate-200 group hover:bg-slate-100 transition-all duration-200 cursor-pointer p-4  "
              key={item.id}
            >
              <h1 className="text-[18px] font-semibold">{item.title}</h1>
              {/* <p className="line-clamp-3 pl-2">{item.content}</p> */}
              {item.content && (
                <p
                  className="line-clamp-3 pl-2"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></p>
              )}
              <div className="w-full flex flex-row-reverse">
                <div>
                  <h2 className="w-full  ">Written by: {item.User.name}</h2>
                  <h2 className="w-full  ">
                    {item.createdAt.toLocaleString()}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default AllArticlesPage;
