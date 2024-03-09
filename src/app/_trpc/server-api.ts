import { httpBatchLink } from "@trpc/client";

import { appRouter } from "@/server";
import { createCallerFactory } from "@/server/trpc";

const createCaller = createCallerFactory(appRouter);

// export const serverApi = createCaller({
//     httpBatchLink: httpBatchLink({
//         url: "/api/trpc",
//     }),
// });
export const serverApi = createCaller({});
