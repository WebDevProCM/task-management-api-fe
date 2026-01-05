import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-9xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you are looking for doesnt exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go to Homepage
          </Link>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-2">Common pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/login" className="text-primary hover:underline text-sm">
              Login
            </Link>
            <Link href="/register" className="text-primary hover:underline text-sm">
              Register
            </Link>
            <Link href="/" className="text-primary hover:underline text-sm">
              Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}