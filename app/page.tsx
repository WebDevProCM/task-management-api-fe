'use client'

import { redirect } from 'next/navigation'
import { isAuthenticated } from '@/lib/auth'
import TaskList from '@/components/task-list'
import { useEffect } from 'react'

export default function HomePage() {
  
  //protecting routes
  useEffect(() =>{
    const authenticated = isAuthenticated()
    console.log("authenticated", authenticated)
    if (!authenticated) {
      redirect('/login')
    }
    
    
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Welcome to Task Manager
      </h1>
      <TaskList />
    </div>
  )
}