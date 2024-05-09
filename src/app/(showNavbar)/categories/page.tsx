import { getAllCategories } from "@/utils/Lib";
import React, { Suspense } from "react";
import Categories from "./Categories";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PopularCategories from "./PopularCategories";

async function CategoriesPage() {
  return (
    <div>
      <div className="  ">
        <div className="mb-4">
          <h1 className="text-[20px] font-bold ">See popular topics </h1>
        </div>
        <ScrollArea className=" rounded-md  border-slate-200">
          <Suspense
            fallback={
              <h2 className="w-full text-center">Loading Categories</h2>
            }
          >
            <PopularCategories />
          </Suspense>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <div className="  ">
        <div className="mb-4">
          <h1 className="text-[20px] font-bold ">Browse all categories </h1>
        </div>
        <ScrollArea className=" rounded-md border-[2px] border-slate-200">
          <Suspense
            fallback={
              <h2 className="w-full text-center">Loading Categories</h2>
            }
          >
            <Categories />
          </Suspense>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}

export default CategoriesPage;
