import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import type { School } from '../types/school.type'

function SchoolCard({ school }: { school: School }) {
  return (
    <div className='group transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl'>
      <div className='relative overflow-hidden'>
        <img
          src={school.image}
          alt={school.name}
          className='h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'></div>
      </div>

      <div className='p-6'>
        <h3 className='mb-2 text-xl font-bold text-gray-800 transition-colors duration-200 group-hover:text-indigo-600'>
          {school.name}
        </h3>

        <div className='mb-4 flex items-center text-gray-600'>
          <MapPin className='mr-2 h-4 w-4 text-indigo-500' />
          <span>
            {school.city}, {school.state}
          </span>
        </div>

        <div className='space-y-3'>
          <div className='flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600'>
            <Phone className='mr-3 h-4 w-4 text-indigo-500' />
            <a href={`tel:${school.contact}`} className='hover:underline'>
              {school.contact}
            </a>
          </div>

          <div className='flex items-center text-sm text-gray-600 transition-colors duration-200 hover:text-indigo-600'>
            <Mail className='mr-3 h-4 w-4 text-indigo-500' />
            <a href={`mailto:${school.email}`} className='hover:underline'>
              {school.email}
            </a>
          </div>

          <div className='flex items-start text-sm text-gray-600'>
            <MapPin className='mt-0.5 mr-3 h-4 w-4 text-indigo-500' />
            <span className='leading-relaxed'>{school.address}</span>
          </div>
        </div>

        <div className='mt-6'>
          <button className='group/btn flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-white transition-all duration-200 hover:from-indigo-600 hover:to-purple-700'>
            <span>View Details</span>
            <ExternalLink className='h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SchoolCard
