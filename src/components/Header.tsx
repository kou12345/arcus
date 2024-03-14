import { UserButton } from "@clerk/nextjs";
import React from "react";

export const Header = () => {
  return (
    <div>
      <div className="flex justify-between mb-4 h-6">
        <h1 className="text-xl">Arcus</h1>
        <UserButton />
      </div>
      <hr />
    </div>
  );
};
