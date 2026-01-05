'use client'

import { useState, useEffect } from 'react'
import { Task } from '@/types/task'
import TaskCard from './task-card'
import TaskForm from './task-form'
import { createTask, deleteTask, fetchTasks } from '@/services/task'

interface TaskListProps {
  initialTasks?: Task[]
}

export default function TaskList({ initialTasks = [] }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [page, setPage] = useState(1)

  //loading tasks fn
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasks( page, 10);
      console.log("data", data)
      if(data.data?.tasks){
        setTasks(data.data?.tasks)
      }
    } catch (error) {
      console.error('Failed to load tasks:', error)
    } finally {
      setLoading(false)
    }
  }

  //handling pagination
  useEffect(() => {
    loadTasks()
  }, [page])

  const handleCreateTask = async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTask = await createTask(taskData)

      if(newTask?.success){
        loadTasks();
      }
      setShowForm(false)
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return
    
    try {
      await deleteTask(id)
      loadTasks();
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          {showForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-900 p-4 rounded-lg">
          <TaskForm onSubmit={handleCreateTask} isLoading={loading} />
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Create your first task!
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2">Page {page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 border rounded-md disabled:opacity-50"
          disabled={tasks?.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  )
}