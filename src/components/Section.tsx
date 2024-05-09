import React, { ReactNode, Suspense } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

function Section({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="  ">
      <div className="mb-4">
        <h1 className="text-[20px] font-bold ">{title}</h1>
      </div>
      <ScrollArea className=" rounded-md  border-slate-200">
        <Suspense
          fallback={<h2 className="w-full text-center">Loading ...</h2>}
        >
          {children}
        </Suspense>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default Section;
