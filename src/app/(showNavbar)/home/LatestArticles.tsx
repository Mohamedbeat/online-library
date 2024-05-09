import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getLatestArticles } from "@/utils/Lib";
import React from "react";

async function LatestArticles() {
  const data = await getLatestArticles();
  //   console.log(data);

  return (
    <div className="w-full flex flex-col items-center justify-start">
      <div className="w-[300px] md:w-full">
        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-around md:border-0 rounded-md p-4">
          {data.map((item) => {
            return (
              <TooltipProvider key={item.id}>
                <Tooltip>
                  <TooltipTrigger>
                    {" "}
                    <div
                      key={item.id}
                      className="group text-[16px] min-h-[100px]  cursor-pointer rounded-md transition-all duration-200 hover:bg-slate-200 p-4"
                    >
                      <div className=" group-hover:underline text-wrap max-w-[300px] font-medium">
                        {item.title}
                      </div>
                      <div className="capitalize mt-2 text-left ">
                        By : {item.User.name}
                      </div>
                      <div className="mt-2 text-right md:text-left">
                        {item.createdAt.toLocaleDateString()}
                      </div>
                      <div className="hidden mt-2 w-full md:flex flex-row-reverse">
                        <div className=" mt-2 capitalize rounded-lg bg-slate-200 transition-all duration-200 group-hover:bg-slate-50 p-2">
                          {item.Category.category}
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Click to read</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LatestArticles;
