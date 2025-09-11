import { protectedRouter, router } from "../trpc";
import z from "zod"

export const projectRouter = router({
    createProject: protectedRouter
        .input(
            z.object({
                name: z.string(),
                GithubURl: z.string(),
                GithubToken: z.string().optional()
            })
        )
        .mutation(async ({ ctx, input }) => {
            // call db here save data using // ctx has session user id 
            const projects = await ctx.Dbclient.project.create({
                data: {
                    GithubURl: input.GithubURl,
                    RepoName: input.name,
                    projects: {
                        create: {
                            userId: ctx.user.userId!
                        }
                    }
                },
            })

            return projects
        }),

        getproject: protectedRouter.query(async({ ctx })=>{
            const projectdetail = await ctx.Dbclient.project.findMany({
                where:{
                    projects:{
                        some:{
                            userId:ctx.user.userId!
                        }
                    }
                }
            })
            return projectdetail

        })

})


export type ProjectRouter = typeof projectRouter