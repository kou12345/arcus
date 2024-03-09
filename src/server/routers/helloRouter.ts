import { z } from "zod"
import { publicProcedure, router } from "../trpc"

export const helloRouter = router({
    test: publicProcedure.query(() => {
        return { test: "Hello, world!" }
    }),
    hello: publicProcedure
        .input(
            z.object({
                name: z.string(),
            })
        ).query((opt) => {
            return { greeting: `Hello, ${opt.input.name}!` }
        })
})
