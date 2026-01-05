'use client'

import { useEffect } from 'react'
import Link from 'next/link'

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-lg w-full text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Critical Application Error
            </h1>
            <p className="text-gray-600 mb-6">
              The application encountered a critical error and needs to reload.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <p className="text-red-800 font-medium">Error Details:</p>
              <p className="text-red-600 text-sm mt-1">{error.message}</p>
              {error.digest && (
                <p className="text-red-500 text-xs mt-2">Digest: {error.digest}</p>
              )}
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => reset()}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Reload Application
              </button>
              <Link
                href="/"
                className="inline-block w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
            
            <p className="mt-8 text-sm text-gray-500">
              If this error continues, please clear your browser cache.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

export default GlobalError