"use client";

import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Skeleton } from "./ui/skeleton";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const projectName = pathname.split("/")[2];

  return (
    <div>
      <div className="flex justify-between mb-4 h-6">
        <Link href="/" className="text-xl">
          Arcus
        </Link>
        <Link href={`/project/${projectName}`}>{projectName}</Link>
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
