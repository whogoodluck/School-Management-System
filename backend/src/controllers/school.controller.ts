import { Request, Response, NextFunction } from 'express'

import { createSchoolSchema } from '../schemas/school.schema'
import schoolService from '../services/school.service'
import { JsonResponse } from '../utils/response'

async function createSchool(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = createSchoolSchema.parse(req.body)

    const school = await schoolService.createOne(validatedData)

    res.status(201).json(
      new JsonResponse({
        status: 'success',
        message: 'School created successfully',
        data: school
      })
    )
  } catch (err) {
    next(err)
  }
}

async function getSchools(req: Request, res: Response, next: NextFunction) {
  try {
    const schools = await schoolService.getAll()

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'Schools fetched successfully',
        data: schools
      })
    )
  } catch (err) {
    next(err)
  }
}

async function getSchool(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const school = await schoolService.getOne(Number(id))

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'School fetched successfully',
        data: school
      })
    )
  } catch (err) {
    next(err)
  }
}

async function updateSchool(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const validatedData = createSchoolSchema.parse(req.body)

    const school = await schoolService.updateOne(Number(id), validatedData)

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'School updated successfully',
        data: school
      })
    )
  } catch (err) {
    next(err)
  }
}

async function deleteSchool(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    await schoolService.deleteOne(Number(id))

    res.status(200).json(
      new JsonResponse({
        status: 'success',
        message: 'School deleted successfully'
      })
    )
  } catch (err) {
    next(err)
  }
}

export default {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool
}
