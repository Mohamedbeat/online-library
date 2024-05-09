import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getAllCategories } from "@/utils/Lib";
import React from "react";

async function Categories() {
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

  const data = await getAllCategories();
  // console.log(data);
  return (
    <div className="flex w-max space-x-4 p-4">
      {data &&
        data?.map((item) => {
          return (
            <div
              key={item.id}
              className=" md:min-h-[150px] min-h-[200px] max-w-[310px] md:w-[300px] cursor-pointer group rounded-md p-2 pl-4 hover:bg-slate-200 transition-all duration-200 "
            >
              <div
                key={item.id}
                className="text-[18px] font-semibold group-hover:underline"
              >
                {item.category}
              </div>
              <div className="pl-1">{item.descr}</div>
            </div>
          );
        })}
    </div>
  );
}

export default Categories;
