import { Dbclient } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { initTRPC, TRPCError } from "@trpc/server"

const t = initTRPC.create() //creating context here 


const isAuthenticated = t.middleware((async ({ ctx  , next})=>{
    const  user = await auth()
    if(!user){
        throw new TRPCError({
            code:"UNAUTHORIZED",
        })
    }
    return next({
        ctx:{
            ...ctx,
            user,
            Dbclient
        }
    })

}))

export const router = t.router
export const publicProcedure = t.procedure
export const protectedRouter = t.procedure.use(isAuthenticated)

