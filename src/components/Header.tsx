import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React, { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

export const Header = () => {
  return (
    <div>
      <div className="flex justify-between mb-4 h-6">
        <Link href="/" className="text-xl">
          Arcus
        </Link>
        <ClerkLoading>
          <Skeleton className="h-8 w-8 rounded-full" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
      <hr />
    </div>
  );
};
