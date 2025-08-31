import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './schoolImages')
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const fileFilter = (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

export const uploadSchoolImage = upload.single('image')
