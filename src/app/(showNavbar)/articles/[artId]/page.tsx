import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteArticle, getArticleById, getSession } from "@/utils/Lib";
import { Frown, Pencil, Trash } from "lucide-react";
import Link from "next/link";

import React from "react";
import DeleteButton from "./deleteButton";

async function ArticleSinglePage({ params }: { params: { artId: string } }) {
  const data = await getArticleById(params.artId);
  if (!data) {
    return (
      <div className="w-full h-screen text-[20px] font-bold flex gap-1 items-center justify-center">
        <p className="w-max"> No results sorry </p> <Frown /> <p> !</p>
      </div>
    );
  } else {
    // console.log(data);
    const session = await getSession();
    let isArticleOwner;
    if (session) {
      isArticleOwner = session.payload.id === data.authorId;
    } else {
      isArticleOwner = false;
    }

    const deleteArticleFunc = async () => {
      try {
        await deleteArticle(params.artId);
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div className="w-full flex flex-col items-center justify-start md:flex">
        <div className="w-full flex flex-col items-center justify-start max-w-[300px] md:max-w-max md:block">
          {isArticleOwner && (
            <div className="w-full flex flex-row-reverse gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/articles/${params.artId}/edit`}>
                      <Button>
                        <Pencil />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Dialog>
                      <DialogTrigger>
                        <Button>
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your article and remove the data from our
                            servers.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Cancel</Button>
                          </DialogClose>
                          <DeleteButton
                            deleteFunc={deleteArticle}
                            id={params.artId}
                          />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          {/* article header */}
          <div className="w-full items-center flex gap-8 border-slate-200 border-b-2 rounded-md py-2">
            {/* user infp */}
            <Link
              href={`/profile/${data.authorId}`}
              className="hidden md:flex items-center  gap-2 group"
            >
              <div className="uppercase text-[16px] md:text-[18px]  w-10  h-10 flex items-center justify-center bg-blue-200 rounded-full">
                {data.user.name.charAt(0)}
              </div>
              <div className="capitalize text-[16px] md:text-[18px]  group-hover:underline">
                {data.user.name}
              </div>
            </Link>
            {/* article title */}
            <div className="px-4 border-slate-200 md:border-l-2 md:font-semibold font-medium py-4 md:h-auto text-justify flex items-center justify-center text-[18px]">
              {data.title}
            </div>
          </div>
          {/* article content */}
          {/* <div className="whitespace-pre-line py-2 border-slate-200 border-b-2 ">
          {data.content}
        </div> */}
          {data.content && (
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              className="whitespace-pre-line py-2 border-slate-200 border-b-2 lg:min-w-[1000px] "
            />
          )}

          {/* article end */}
          <div className="flex flex-row-reverse py-2">
            <div className="flex flex-col">
              <div>Reads : 232 person</div>
              <div>Written at : {data.createdAt.toLocaleDateString()}</div>

              <Link
                href={`/profile/${data.authorId}`}
                className="hover:underline"
              >
                Written by:{" " + data.user.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleSinglePage;
