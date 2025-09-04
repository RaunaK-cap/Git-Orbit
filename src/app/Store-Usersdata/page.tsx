
import { Dbclient } from '@/lib/db'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const { userId } = await auth()
    if(!userId){
        throw new Error("user not found")
    }
    const client = await clerkClient()
    const user = await client.users.getUser(userId)
    if(!user){
        throw new Error("notfound")
    }

        await Dbclient.user.upsert({
            where:{
                emailAddress: user.emailAddresses[0].emailAddress
            },
            create:{ 
                id:userId,
                emailAddress: user.emailAddresses[0].emailAddress,
                firstname:user.firstName,
                Lastname:user.lastName,
                imageURl:user.imageUrl
            }, 
            update:{
                imageURl:user.imageUrl,
                firstname:user.firstName,
                Lastname:user.lastName

            }
        })

        return redirect("/dashboard")
  

  return (
    <div>
      <h1> Please wait .. Redirecting to Main page </h1>
    </div>
  )
}

export default page

