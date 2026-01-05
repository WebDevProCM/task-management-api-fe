'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Task } from '@/types/task'
import { getToken } from '@/lib/auth'
import TaskForm from '@/components/task-form'
import { deleteTask, fetchTask, updateTask } from '@/services/task'

export default function TaskDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [error, setError] = useState('')

  const token = getToken()
  const taskId = params.id as string

  useEffect(() => {
    if (!token) {
      router.push('/login')
      return
    }

    loadTask()
  }, [taskId, token])

  const loadTask = async () => {
    try {
      setLoading(true)
      const data = await fetchTask(token!, taskId)
      setTask(data.data)
    } catch (err) {
      console.log("error: ", err)
      setError('Failed to load task')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateTask = async (updates: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    if (!token) return
    
    try {
      const updatedTask = await updateTask(token, updates, taskId)
      setTask(updatedTask.data)
      setEditing(false)
    } catch (err) {
      console.log("error: ", err)
      setError('Failed to update task')
    }
  }

  const handleDeleteTask = async () => {
    if (!token) return
    
    if (!confirm('Are you sure you want to delete this task?')) return
    
    try {
      await deleteTask(token,taskId)
      router.push('/')
    } catch (err) {
      console.log("error: ", err)
      setError('Failed to delete task')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading task...</div>
  }

  if (error || !task) {
    return (
      <div className="text-center py-8 text-red-500">
        {error || 'Task not found'}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Task Details</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setEditing(!editing)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editing ? 'Cancel' : 'Edit'}
          </button>
          <button
            onClick={handleDeleteTask}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>

      {editing ? (
        <TaskForm
          initialData={task}
          onSubmit={handleUpdateTask}
          isLoading={loading}
        />
      ) : (
        <div className="bg-gray-200 rounded-lg shadow-md p-6">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">Title</span>
            <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
          </div>

          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">Description</span>
            <p className="text-gray-700 mt-1">{task.description}</p>
          </div>

          <div className="mb-4">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                task.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
            <div>
              <span className="font-medium">Created:</span>
              <p>{new Date(task.createdAt!).toLocaleString()}</p>
            </div>
            <div>
              <span className="font-medium">Updated:</span>
              <p>{new Date(task.updatedAt!).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}