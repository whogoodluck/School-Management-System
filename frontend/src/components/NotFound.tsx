import { AlertTriangle } from 'lucide-react'
import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <div className='flex flex-col items-center p-10 text-center'>
        <AlertTriangle className='mb-6 h-16 w-16 text-yellow-500' />

        <h1 className='mb-2 text-5xl font-extrabold text-gray-800'>404</h1>
        <p className='mb-6 text-lg text-gray-600'>
          Oops! The page you are looking for doesn’t exist.
        </p>

        <NavLink
          to='/'
          className='group/btn flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-white transition-all duration-200 hover:from-indigo-600 hover:to-purple-700'
        >
          <span>Back to Home</span>
        </NavLink>
      </div>
    </div>
  )
}

export default NotFound
