'use client'

import { useFormStatus } from 'react-dom'
export function SubmitButton() {

  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}