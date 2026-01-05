import { useFormStatus } from 'react-dom'

export const RegisterButton = () => {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer transition-all w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {pending ? 'Creating account...' : 'Register'}
    </button>
  )
}