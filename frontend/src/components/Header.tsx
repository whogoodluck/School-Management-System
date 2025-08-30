import { Search } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

function Header({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
}) {
  return (
    <header className='sticky top-0 z-50 bg-white/95'>
      <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex-shrink-0'>
            <h1 className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent'>
              SchoolFinder
            </h1>
          </div>

          <div className='mx-8 max-w-lg flex-1'>
            <div className='relative'>
              <input
                type='text'
                placeholder='Search schools by name, city, or state...'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className='w-full rounded-full border-2 border-transparent bg-white px-4 py-3 pr-4 pl-12 text-gray-700 shadow-sm transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200/50 focus:outline-none'
              />
              <Search className='absolute top-3.5 left-4 h-5 w-5 text-gray-400' />
            </div>
          </div>

          <nav className='hidden space-x-8 md:flex'>
            <a
              href='#'
              className='font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-600'
            >
              Home
            </a>
            <a
              href='#'
              className='font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-600'
            >
              About
            </a>
            <a
              href='#'
              className='font-medium text-gray-700 transition-colors duration-200 hover:text-indigo-600'
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
