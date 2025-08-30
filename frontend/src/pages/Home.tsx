import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import Header from '../components/Header'
import SchoolCard from '../components/SchoolCard'

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Sample school data
  const schools = [
    {
      id: 1,
      name: 'Sunshine Elementary School',
      image:
        'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      city: 'Austin',
      state: 'Texas',
      contact: '+1 (512) 555-0123',
      email: 'info@sunshine-elementary.edu',
      address: '123 Oak Street, Austin, TX 78701',
    },
    {
      id: 2,
      name: 'Riverside High School',
      image:
        'https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      city: 'Portland',
      state: 'Oregon',
      contact: '+1 (503) 555-0456',
      email: 'admissions@riverside-high.edu',
      address: '456 River Road, Portland, OR 97201',
    },
    {
      id: 3,
      name: 'Mountain View Academy',
      image:
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      city: 'Denver',
      state: 'Colorado',
      contact: '+1 (303) 555-0789',
      email: 'contact@mountainview-academy.edu',
      address: '789 Mountain Drive, Denver, CO 80202',
    },
    {
      id: 4,
      name: 'Coastal Middle School',
      image:
        'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      city: 'San Diego',
      state: 'California',
      contact: '+1 (619) 555-0321',
      email: 'office@coastal-middle.edu',
      address: '321 Beach Boulevard, San Diego, CA 92101',
    },
    {
      id: 5,
      name: 'Pine Grove Charter School',
      image:
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      city: 'Atlanta',
      state: 'Georgia',
      contact: '+1 (404) 555-0654',
      email: 'info@pinegrove-charter.edu',
      address: '654 Pine Street, Atlanta, GA 30301',
    },
    {
      id: 6,
      name: 'Metropolitan Prep Academy',
      image:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      city: 'New York',
      state: 'New York',
      contact: '+1 (212) 555-0987',
      email: 'admissions@metro-prep.edu',
      address: '987 Broadway, New York, NY 10001',
    },
  ]

  const filteredSchools = useMemo(() => {
    if (!searchTerm) return schools

    return schools.filter(
      school =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <section className='px-4 py-20 text-center'>
        <div className='mx-auto max-w-4xl'>
          <h1 className='animate-fade-in-up mb-6 text-5xl font-bold text-white md:text-6xl'>
            Find Your Perfect School
          </h1>
          <p className='animate-fade-in-up-delay mx-auto mb-8 max-w-2xl text-xl text-white/90'>
            Discover exceptional educational institutions across the country. Find the right fit for
            your child's future.
          </p>
          <div className='animate-fade-in-up-delay flex flex-col justify-center gap-4 sm:flex-row'>
            <button className='transform rounded-full bg-white px-8 py-3 font-semibold text-indigo-600 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-gray-100 hover:shadow-xl'>
              Browse Schools
            </button>
            <button className='rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-indigo-600'>
              Learn More
            </button>
          </div>
        </div>
      </section>

      <section className='bg-white/95 shadow-2xl backdrop-blur-sm'>
        <div className='mx-auto max-w-7xl px-6 py-12'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-4xl font-bold text-gray-800'>Featured Schools</h2>
            <div className='mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600'></div>
            <p className='mx-auto mt-6 max-w-2xl text-gray-600'>
              Explore our curated selection of outstanding educational institutions
            </p>
          </div>

          {searchTerm && (
            <div className='mb-8 text-center'>
              <p className='text-gray-600'>
                Found {filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </p>
            </div>
          )}

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {filteredSchools.map(school => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>

          {filteredSchools.length === 0 && searchTerm && (
            <div className='py-12 text-center'>
              <div className='mb-4 text-gray-400'>
                <Search className='mx-auto h-16 w-16' />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-gray-600'>No schools found</h3>
              <p className='text-gray-500'>Try adjusting your search terms or browse all schools</p>
              <button
                onClick={() => setSearchTerm('')}
                className='mt-4 rounded-lg bg-indigo-500 px-6 py-2 text-white transition-colors duration-200 hover:bg-indigo-600'
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className='bg-gray-800 py-8 text-white'>
        <div className='mx-auto max-w-7xl px-6 text-center'>
          <div className='mb-4'>
            <h3 className='bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent'>
              SchoolFinder
            </h3>
          </div>
          <p className='mb-4 text-gray-400'>
            Helping families find the perfect educational environment for their children.
          </p>
          <div className='flex justify-center space-x-6'>
            <a href='#' className='text-gray-400 transition-colors duration-200 hover:text-white'>
              Privacy
            </a>
            <a href='#' className='text-gray-400 transition-colors duration-200 hover:text-white'>
              Terms
            </a>
            <a href='#' className='text-gray-400 transition-colors duration-200 hover:text-white'>
              Support
            </a>
          </div>
          <div className='mt-6 border-t border-gray-700 pt-6'>
            <p className='text-gray-500'>© 2025 SchoolFinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
