"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

function DeleteButton({
  deleteFunc,
  id,
}: {
  deleteFunc: (id: string) => Promise<boolean>;
  id: string;
}) {
  const router = useRouter();

  return (
    <Button
      variant={"destructive"}
      onClick={() => {
        deleteFunc(id);
        router.push("/home");
      }}
    >
      Delete
    </Button>
  );
}

export default DeleteButton;
