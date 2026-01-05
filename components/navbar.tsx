import Link from 'next/link'

export default function Navbar() {
    const authenticated = false;

    const handleLogout = async () => {
    }

  return (
    <nav className="bg-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            Task Manager
          </Link>
          
          <div className="flex items-center space-x-4">
            {authenticated ? (
              <>
                <Link href="/" className="text-gray-700 hover:text-primary">
                  Tasks
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-200 hover:text-primary">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}