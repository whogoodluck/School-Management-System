import { z } from 'zod'

const requiredString = (field: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${field} is required` })

export const createSchoolSchema = z.object({
  name: requiredString('School name').max(500, 'School name must be less than 500 characters'),

  address: requiredString('Address').max(1000, 'Address must be less than 1000 characters'),

  city: requiredString('City').max(100, 'City must be less than 100 characters'),

  state: requiredString('State').max(100, 'State must be less than 100 characters'),

  contact: requiredString('Contact number')
    .min(10, 'Contact number must be at least 10 digits')
    .max(15, 'Contact number must be less than 15 digits')
    .regex(/^[0-9+\-\s()]+$/, 'Contact number contains invalid characters'),

  image: z
    .any()
    .optional()
    .refine(files => {
      if (!files || files.length === 0) return true
      const file = files[0]
      return file && file.type.startsWith('image/')
    }, 'Please upload a valid image file'),

  email_id: requiredString('Email')
    .email('Invalid email format')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase(),
})

export type CreateSchoolInput = z.infer<typeof createSchoolSchema>
