import { protectedRouter, publicProcedure , router } from "../trpc";
import z from "zod"

export const projectRouter = router({
    createProject: protectedRouter
    .input(
        z.object({
            name:z.string(),
            GithubURl: z.string(),
            GithubToken: z.string().optional()
        })
    )
    .mutation(async( { ctx , input})=>{
        console.log("your input all values:" , input)

        // call db here save data using // ctx has session user id 
        return true
    })
     
})


export type ProjectRouter = typeof projectRouter