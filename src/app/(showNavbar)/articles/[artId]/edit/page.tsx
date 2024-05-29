"use client";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import Section from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories, getArticleById, updateArticle } from "@/utils/Lib";
import { Send, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

function EditArticlepage({ params }: { params: { artId: string } }) {
  const [article, setArticle] = useState<
    | ({
        category: {
          category: string;
          id: number;
        };
        user: {
          id: number;
          name: string;
        };
      } & {
        id: number;
        title: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        authorId: number;
        categoryId: number;
      })
    | null
  >();

  console.log(params.artId);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string>("");
  const [cats, setCats] = useState<
    | {
        category: string;
        id: number;
        descr: string;
      }[]
    | null
  >(null);

  const [err, setErr] = useState("");

  const getCategories = async () => {
    const res = await getAllCategories();
    if (res.length) {
      console.log(res);

      setCats(res);
    }
  };

  const getArticle = async () => {
    const res = await getArticleById(params.artId);
    if (res) {
      setArticle(res);
      setCategoryId(res.categoryId.toString());
      setTitle(res.title);
      setContent(res.content);
    }
  };

  //   const createArticle = async () => {
  //     try {
  //       const res = await addArticle({
  //         catId: categoryId,
  //         content,
  //         title,
  //       });
  //     } catch (error: any) {
  //       setErr(error.message);
  //     }
  //   };

  //   useEffect(() => {
  //     console.log(categoryId);
  //   }, [categoryId]);
  const router = useRouter();

  useEffect(() => {
    getCategories();
    getArticle();
  }, []);

  const updateArticleFunc = async () => {
    try {
      await updateArticle({
        catId: categoryId,
        content: content || "",
        title,
        artId: params.artId,
      });
      router.push("/articles/" + params.artId);
    } catch (error: any) {
      setErr(error.message);
    }
  };

  return (
    <div>
      <Section title="Add new Article">
        {err && (
          <div className="text-center bg-red-600 text-white w-full py-3 rounded-md relative">
            <X
              className="absolute top-[10px] right-[10px] cursor-pointer"
              onClick={() => setErr("")}
            />
            {err}
          </div>
        )}
        <div>
          <Label>Article title :</Label>
          <div className="w-full flex gap-4 items-center justify-center mt-2">
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="title"
              className=""
            />
            <Button
              className="flex gap-2 justify-between"
              onClick={updateArticleFunc}
            >
              <p>Save</p> <Send height={20} width={20} />
            </Button>
          </div>
        </div>
        <div className="mt-4">
          <Label>Article category :</Label>

          <Select
            onValueChange={(str) => setCategoryId(str)}
            defaultValue={article?.category.id.toString()}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={article?.category.category} />
            </SelectTrigger>
            <SelectContent>
              {cats &&
                cats.map((cat) => {
                  return (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.category}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <Label>Article Content :</Label>
          {content && (
            <ReactQuillEditor
              value={content}
              setValue={setContent as Dispatch<SetStateAction<string>>}
            />
          )}
        </div>
      </Section>
    </div>
  );
}

export default EditArticlepage;
