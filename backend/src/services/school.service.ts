import { prisma } from '../lib/db'
import { CreateSchoolInput } from '../schemas/school.schema'

async function createOne(data: CreateSchoolInput) {
  const school = await prisma.school.create({
    data
  })

  return school
}

async function getAll() {
  const schools = await prisma.school.findMany()

  return schools
}

async function getOne(id: number) {
  const school = await prisma.school.findUnique({
    where: {
      id
    }
  })

  return school
}

async function updateOne(id: number, data: CreateSchoolInput) {
  const school = await prisma.school.update({
    where: {
      id
    },
    data
  })

  return school
}

async function deleteOne(id: number) {
  await prisma.school.delete({
    where: {
      id
    }
  })
}

export default {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne
}
