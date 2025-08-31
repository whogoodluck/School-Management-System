import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'sonner'
import Loading from '../components/Loading'
import SchoolCard from '../components/SchoolCard'
import { getSchools } from '../services/school'
import { type School } from '../types/school.type'

const Home = () => {
  const [isPending, setIsPending] = useState(false)
  const [schools, setSchools] = useState<School[]>([])

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setIsPending(true)
        const res = await getSchools()
        setSchools(res.data)
      } catch {
        toast.error('Failed to fetch schools')
      } finally {
        setIsPending(false)
      }
    }
    fetchSchools()
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500'>
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
            <NavLink
              to={'/schools/create'}
              className='rounded-full border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-indigo-600'
            >
              Add New School
            </NavLink>
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

          {isPending && <Loading className='min-h-[500px]' />}

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
            {schools.map(school => (
              <SchoolCard key={school.id} school={school} />
            ))}
          </div>
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
