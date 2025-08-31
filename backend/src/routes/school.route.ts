import { Router } from 'express'
import schoolController from '../controllers/school.controller'
import { uploadSchoolImage } from '../middlewares/multer'

const schoolRouter = Router()

schoolRouter.post('/', uploadSchoolImage, schoolController.createSchool)
schoolRouter.get('/', schoolController.getSchools)
schoolRouter.get('/:id', schoolController.getSchool)
schoolRouter.put('/:id', uploadSchoolImage, schoolController.updateSchool)
schoolRouter.delete('/:id', schoolController.deleteSchool)

export default schoolRouter
