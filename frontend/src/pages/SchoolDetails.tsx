import { ArrowLeft, Calendar, Edit, Mail, MapPin, MoreVertical, Phone, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Loading from '../components/Loading'
import NotFound from '../components/NotFound'
import { deleteSchool, getSchool } from '../services/school'
import { type School } from '../types/school.type'

function SchoolDetails() {
  const [school, setSchool] = useState<School | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        setIsPending(true)
        const res = await getSchool(Number(id))
        setSchool(res.data)
      } catch {
        toast.error('Failed to fetch school')
      } finally {
        setIsPending(false)
      }
    }
    fetchSchool()
  }, [id])

  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false)
    }

    if (showDropdown) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showDropdown])

  const handleDeleteSchool = async () => {
    try {
      setIsDeleting(true)
      await deleteSchool(Number(id))
      toast.success('School deleted successfully')
      navigate(-1)
    } catch {
      toast.error('Failed to delete school')
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (isPending) {
    return <Loading className='min-h-screen' />
  }

  if (!school) {
    return <NotFound />
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='mx-auto max-w-4xl px-4'>
        <div className='flex items-center justify-between'>
          <button
            onClick={() => window.history.back()}
            className='mb-6 flex items-center gap-2 text-indigo-600 transition-colors hover:text-indigo-800'
          >
            <ArrowLeft className='h-5 w-5' />
            <span>Back to Schools</span>
          </button>

          <div className='relative'>
            <button
              onClick={e => {
                e.stopPropagation()
                setShowDropdown(!showDropdown)
              }}
              className='flex cursor-pointer items-center justify-center'
            >
              <MoreVertical className='h-5 w-5 text-gray-600' />
            </button>
            {showDropdown && (
              <div className={'absolute top-7 right-0 z-10 w-48 rounded-lg bg-white p-2 shadow-xl'}>
                <NavLink
                  to={`/schools/${school.id}/edit`}
                  className='flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-left text-gray-700 transition-colors hover:bg-indigo-50 hover:text-indigo-600'
                >
                  <Edit className='h-4 w-4' />
                  <span>Edit School</span>
                </NavLink>
                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleDeleteSchool()
                  }}
                  //   onClick={handleDeleteSchool}
                  className='flex w-full cursor-pointer items-center gap-3 rounded-md px-4 py-2 text-left text-gray-700 transition-colors hover:bg-red-50 hover:text-red-600'
                >
                  {isDeleting ? (
                    <Loading className='h-4 w-4' />
                  ) : (
                    <>
                      <Trash2 className='h-4 w-4' />
                      <span>Delete School</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='overflow-hidden rounded-2xl bg-white shadow-xl'>
          <div className='relative'>
            <img
              src={school.image}
              alt={school.name}
              className='h-64 w-full object-cover md:h-80'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent'></div>
            <div className='absolute bottom-6 left-6 text-white'>
              <h1 className='text-3xl font-bold md:text-4xl'>{school.name}</h1>
              <div className='mt-2 flex items-center text-lg'>
                <MapPin className='mr-2 h-5 w-5' />
                <span>
                  {school.city}, {school.state}
                </span>
              </div>
            </div>
          </div>

          <div className='p-8'>
            <div className='grid gap-8 md:grid-cols-2'>
              <div className='space-y-6'>
                <div>
                  <h2 className='mb-4 text-2xl font-semibold text-gray-800'>Contact Information</h2>
                  <div className='space-y-4'>
                    <div className='flex items-center rounded-lg bg-gray-50 p-4 transition-colors hover:bg-indigo-50'>
                      <Phone className='mr-3 h-5 w-5 text-indigo-500' />
                      <div>
                        <p className='text-sm text-gray-500'>Phone</p>
                        <a
                          href={`tel:${school.contact}`}
                          className='font-medium text-gray-800 hover:text-indigo-600'
                        >
                          {school.contact}
                        </a>
                      </div>
                    </div>

                    <div className='flex items-center rounded-lg bg-gray-50 p-4 transition-colors hover:bg-indigo-50'>
                      <Mail className='mr-3 h-5 w-5 text-indigo-500' />
                      <div>
                        <p className='text-sm text-gray-500'>Email</p>
                        <a
                          href={`mailto:${school.email_id}`}
                          className='font-medium text-gray-800 hover:text-indigo-600'
                        >
                          {school.email_id}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className='mb-4 text-2xl font-semibold text-gray-800'>Address</h2>
                  <div className='flex items-start rounded-lg bg-gray-50 p-4'>
                    <MapPin className='mt-1 mr-3 h-5 w-5 text-indigo-500' />
                    <div>
                      <p className='text-sm text-gray-500'>Location</p>
                      <p className='leading-relaxed font-medium text-gray-800'>{school.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-6'>
                <div>
                  <h2 className='mb-4 text-2xl font-semibold text-gray-800'>School Information</h2>
                  <div className='space-y-4'>
                    <div className='rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4'>
                      <div className='flex items-center'>
                        <Calendar className='mr-3 h-5 w-5 text-indigo-500' />
                        <div>
                          <p className='text-sm text-gray-500'>Established</p>
                          <p className='font-medium text-gray-800'>
                            {formatDate(school.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-4'>
                      <div className='flex items-center'>
                        <Calendar className='mr-3 h-5 w-5 text-purple-500' />
                        <div>
                          <p className='text-sm text-gray-500'>Last Updated</p>
                          <p className='font-medium text-gray-800'>
                            {formatDate(school.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white'>
                  <h3 className='mb-2 text-lg font-semibold'>Get in Touch</h3>
                  <p className='mb-4 text-indigo-100'>
                    Contact {school.name} for more information about admissions, programs, and
                    facilities.
                  </p>
                  <div className='flex gap-3'>
                    <a
                      href={`tel:${school.contact}`}
                      className='flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 transition-colors hover:bg-white/30'
                    >
                      <Phone className='h-4 w-4' />
                      <span>Call</span>
                    </a>
                    <a
                      href={`mailto:${school.email_id}`}
                      className='flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 transition-colors hover:bg-white/30'
                    >
                      <Mail className='h-4 w-4' />
                      <span>Email</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchoolDetails
