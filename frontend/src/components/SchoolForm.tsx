import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Mail, MapPin, Phone, School, Upload, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { createSchoolSchema, type CreateSchoolInput } from '../schemas/school.schema'
import { createSchool, updateSchool } from '../services/school'
import { type School as SchoolType } from '../types/school.type'
import Button from './Button'

const SchoolForm = ({
  school,
  formType = 'create',
}: {
  school?: SchoolType
  formType?: 'create' | 'update'
}) => {
  const [isPending, setIsPending] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [imagePreview, setImagePreview] = useState(school?.image || '')

  const navigate = useNavigate()

  const form = useForm<CreateSchoolInput>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: {
      name: school?.name || '',
      image: school?.image || null,
      city: school?.city || '',
      state: school?.state || '',
      contact: school?.contact || '',
      email_id: school?.email_id || '',
      address: school?.address || '',
    },
  })

  const states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ]

  const handleFormSubmit = async (data: CreateSchoolInput) => {
    const schoolData = new FormData()

    schoolData.append('name', data.name)
    if (data.image) {
      schoolData.append('image', data.image)
    }
    schoolData.append('city', data.city)
    schoolData.append('state', data.state)
    schoolData.append('contact', data.contact)
    schoolData.append('email_id', data.email_id)
    schoolData.append('address', data.address)

    try {
      setIsPending(true)

      if (formType === 'create') {
        await createSchool(schoolData)
        toast.success('School created successfully')
        navigate('/')
      }

      if (formType === 'update') {
        await updateSchool(school!.id, schoolData)
        toast.success('School updated successfully')
        navigate(-1)
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        setEmailError('Email already exists')
      }
      toast.error(`Failed to ${formType === 'create' ? 'create' : 'update'} school`)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8'>
      <div className='mx-auto max-w-2xl'>
        <div className='mb-8 text-center'>
          <div className='mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-600'>
            <School className='h-8 w-8 text-white' />
          </div>
          <h1 className='mb-2 text-4xl font-bold text-gray-800'>
            {formType === 'update' ? 'Update School' : 'Add New School'}
          </h1>
          <p className='text-gray-600'>
            {formType === 'update'
              ? 'Update the school information below'
              : 'Fill in the school information below'}
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className='space-y-6 rounded-2xl bg-white p-8 shadow-xl'
        >
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              School Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              {...form.register('name')}
              className={`w-full rounded-lg border px-4 py-3 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                form.formState.errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder='Enter school name'
            />
            {form.formState.errors.name && (
              <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                <AlertCircle className='h-4 w-4' />
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>School Image</label>
            <div className='space-y-4'>
              {!imagePreview && (
                <div
                  className='cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors duration-200 hover:border-indigo-400 hover:bg-indigo-50'
                  onClick={() => document.getElementById('imageInput')?.click()}
                >
                  <input
                    id='imageInput'
                    type='file'
                    accept='image/*'
                    onChange={e => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = () => {
                          setImagePreview(reader.result as string)
                        }
                        reader.readAsDataURL(file)

                        form.setValue('image', file)
                      }
                    }}
                    className='hidden'
                  />

                  <div>
                    <Upload className='mx-auto mb-2 h-8 w-8 text-gray-400' />
                    <p className='font-medium text-gray-600'>Click to upload school image</p>
                    <p className='mt-1 text-sm text-gray-400'>PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              )}

              {imagePreview && (
                <div className='relative'>
                  <img
                    src={imagePreview}
                    alt='School preview'
                    className='h-48 w-full rounded-lg border border-gray-200 object-cover'
                  />
                  <button
                    onClick={() => {
                      setImagePreview('')
                      form.setValue('image', null)
                    }}
                    className='absolute top-2 right-2 cursor-pointer rounded-full bg-slate-500 p-1 text-white transition-colors duration-200 hover:bg-slate-600'
                  >
                    <X className='h-4 w-4' />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                City <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                {...form.register('city')}
                className={`w-full rounded-lg border px-4 py-3 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                  form.formState.errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder='Enter city'
              />
              {form.formState.errors.city && (
                <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-4 w-4' />
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                State <span className='text-red-500'>*</span>
              </label>
              <select
                {...form.register('state')}
                className={`w-full rounded-lg border px-4 py-3 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                  form.formState.errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value=''>Select state</option>
                {states.map(state => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {form.formState.errors.state && (
                <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-4 w-4' />
                  {form.formState.errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Contact Number <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <Phone className='absolute top-3.5 left-3 h-5 w-5 text-gray-400' />
                <input
                  type='tel'
                  {...form.register('contact')}
                  className={`w-full rounded-lg border py-3 pr-4 pl-10 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                    form.formState.errors.contact ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder='+1 (555) 123-4567'
                />
              </div>
              {form.formState.errors.contact && (
                <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-4 w-4' />
                  {form.formState.errors.contact.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Email Address <span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <Mail className='absolute top-3.5 left-3 h-5 w-5 text-gray-400' />
                <input
                  type='email'
                  {...form.register('email_id')}
                  className={`w-full rounded-lg border py-3 pr-4 pl-10 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                    form.formState.errors.email_id?.message
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300'
                  }`}
                  onChange={() => setEmailError('')}
                  placeholder='school@example.com'
                />
              </div>
              {form.formState.errors.email_id && (
                <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-4 w-4' />
                  {form.formState.errors.email_id.message}
                </p>
              )}
              {emailError && (
                <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                  <AlertCircle className='h-4 w-4' />
                  {emailError}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Full Address <span className='text-red-500'>*</span>
            </label>
            <div className='relative'>
              <MapPin className='absolute top-3 left-3 h-5 w-5 text-gray-400' />
              <textarea
                {...form.register('address')}
                rows={3}
                className={`w-full resize-none rounded-lg border py-3 pr-4 pl-10 transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 ${
                  form.formState.errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
                placeholder='Enter complete address including street, city, state, and ZIP code'
              />
            </div>
            {form.formState.errors.address && (
              <p className='mt-1 flex items-center gap-1 text-sm text-red-600'>
                <AlertCircle className='h-4 w-4' />
                {form.formState.errors.address.message}
              </p>
            )}
          </div>

          <div className='flex flex-col gap-4 border-t border-gray-200 pt-6 sm:flex-row'>
            <Button variant='secondary' onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type='submit' loading={isPending}>
              {formType === 'create' ? 'Create School' : 'Update School'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SchoolForm
