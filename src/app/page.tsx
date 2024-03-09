import { UserButton } from "@clerk/nextjs";
import { serverApi } from "./_trpc/server-api";

export default async function Home() {
  const hello = await serverApi.hello.test();
  return (
    <div className="h-screen">
      <UserButton />
      <div>{JSON.stringify(hello)}</div>
    </div>
  );
}
