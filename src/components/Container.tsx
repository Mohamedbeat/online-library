import React from "react";

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex-col flex  items-center">{children}</div>
  );
}

export default Container;
