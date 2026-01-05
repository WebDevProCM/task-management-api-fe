'use client'

import { Task } from '@/types/task'
import Link from 'next/link'

interface TaskCardProps {
  task: Task
  onDelete: (id: string) => void
}

export default function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-400">{task.title}</h3>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                task.status === 'completed'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {task.status}
            </span>
          </div>
          <p className="text-gray-500 mt-2">{task.description}</p>
          <p className="text-sm text-gray-400 mt-3">
            Created: {new Date(task.createdAt!).toLocaleDateString()}
          </p>
        </div>

        <div className="flex space-x-2 ml-4">
          <Link
            href={`/tasks/${task._id}`}
            className="text-blue-500 hover:text-blue-700"
          >
            View
          </Link>
          <button
            onClick={() => onDelete(task._id!)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}