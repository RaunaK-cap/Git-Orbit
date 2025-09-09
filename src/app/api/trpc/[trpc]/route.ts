import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "../../root";


const handler = (req:Request)=>{
return fetchRequestHandler({
    endpoint:"/api/trpc",
    req,
    router:appRouter
    // we  can add context things here 
})
}

export { handler as GET , handler as POST}