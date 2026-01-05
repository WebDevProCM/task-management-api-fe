'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { setToken } from '@/lib/auth'
import { loginAction } from '@/lib/actions'
import { SubmitButton } from '@/components/login-submit-btn'

const LoginPage = () => {
  const router = useRouter()
  const [state, formAction] = useActionState(loginAction, null)

  // successful login state change
  useEffect(() => {
    if (state?.success && state.token) {
      setToken(state.token)
      router.push('/')
      router.refresh()
    }
  }, [state, router])

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
      
      {state?.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="••••••••"
          />
        </div>

        <SubmitButton />
      </form>

      <p className="text-center mt-4 text-gray-600">
        Dont have an account? <Link href="/register" className="text-blue-600">Register</Link>
      </p>
    </div>
  )
}

export default LoginPage;