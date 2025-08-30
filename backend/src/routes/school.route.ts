import { Router } from 'express'
import schoolController from '../controllers/school.controller'

const schoolRouter = Router()

schoolRouter.post('/', schoolController.createSchool)
schoolRouter.get('/', schoolController.getSchools)
schoolRouter.get('/:id', schoolController.getSchool)
schoolRouter.put('/:id', schoolController.updateSchool)
schoolRouter.delete('/:id', schoolController.deleteSchool)

export default schoolRouter
