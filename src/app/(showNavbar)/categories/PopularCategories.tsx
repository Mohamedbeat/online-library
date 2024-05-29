import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllCategories, getPopularCategories } from "@/utils/Lib";
import Link from "next/link";
import React from "react";

async function PopularCategories() {
  //   function delayFunctionWithTimeout(func, timeout) {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(func());
  //       }, timeout);
  //     });
  //   }

  //   const delayedResult = delayFunctionWithTimeout(getAllCategories, 10000);
  //   const data = await Promise.all([delayedResult]).then((results) => {
  //     console.log(results[0]); // Output: Hello, delayed world!
  //     return results[0];
  //   });

  const data = await getPopularCategories();
  // console.log(data);
  return (
    <div className="flex flex-col md:flex-row space-x-4 p-4 items-center justify-center">
      {data &&
        data?.map((item) => {
          return (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger key={item.id} className="flex-1 w-full ">
                  <Link
                    href={`/categories/${item.id}`}
                    key={item.id}
                    className=" flex flex-col justify-between md:min-h-[100px]  w-[300px] cursor-pointer group rounded-md p-2 pl-4 hover:bg-slate-200 transition-all duration-200 "
                  >
                    <div
                      key={item.id}
                      className="text-[18px] font-semibold group-hover:underline w-full text-left"
                    >
                      {item.category}
                    </div>
                    <div className="w-full text-right ">
                      {item.article.length} articles.{" "}
                    </div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.article.length} articles.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
    </div>
  );
}

export default PopularCategories;
