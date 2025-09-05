"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'

const Page = () => {
    const { user} = useUser()
  return (
    <div className=''>
    <h1> HI there </h1>
    <h2> this is :  {user?.firstName} , {user?.lastName}</h2>

    </div>
  )
}

export default Page