import axios from 'axios'

const BASE_URL = 'https://school-management-system-yakc.onrender.com/api/schools'

export const createSchool = async (data: any) => {
  const response = await axios.post(`${BASE_URL}`, data)
  return response.data
}

export const getSchools = async () => {
  const response = await axios.get(`${BASE_URL}`)
  return response.data
}

export const getSchool = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`)
  return response.data
}

export const updateSchool = async (id: number, data: any) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data)
  return response.data
}

export const deleteSchool = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/${id}`)
  return response.data
}
