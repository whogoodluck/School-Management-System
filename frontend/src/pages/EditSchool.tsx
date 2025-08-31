import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Loading from '../components/Loading'
import NotFound from '../components/NotFound'
import SchoolForm from '../components/SchoolForm'
import { getSchool } from '../services/school'
import type { School } from '../types/school.type'

function EditSchool() {
  const [school, setSchool] = useState<School | null>(null)
  const [isPending, setIsPending] = useState(false)
  const { id } = useParams()

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

  if (isPending) {
    return <Loading className='h-screen' />
  }

  if (!school) {
    return <NotFound />
  }

  return <SchoolForm formType='update' school={school} />
}

export default EditSchool
