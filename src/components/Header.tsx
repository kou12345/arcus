import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <div>
      <div className="flex justify-between mb-4 h-6">
        <Link href="/" className="text-xl">
          Arcus
        </Link>
        <UserButton />
      </div>
      <hr />
    </div>
  );
};
