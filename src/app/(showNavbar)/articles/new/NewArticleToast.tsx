import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import React from "react";

function NewArticleToast() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}

export default NewArticleToast;
