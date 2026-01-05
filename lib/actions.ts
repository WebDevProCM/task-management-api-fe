'use server'

import { loginUser } from '@/services/user'
import { registerUser } from '@/services/user'
import { redirect } from 'next/navigation'

export const loginAction = async (prevState: unknown, formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  try {
    const response = await loginUser({ email, password })
    
    if (!response.success) {
      return { error: response.message, success: false }
    }

    // Return the token to the client component
    return { 
      token: response.token, 
      success: true, 
      error: null
    }
  } catch (err) {
    return { error: 'Login failed', success: false, message: err }
  }
}

export const registerAction = async (prevState: unknown, formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Validation
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  try {
    const { success, message } = await registerUser({ email, password })

    if (!success) {
      return { error: message || 'Registration failed' }
    }
    
  } catch (err) {
    return { error: 'An unexpected error occurred' }
  }

  //redirect on success
  redirect('/login')
}