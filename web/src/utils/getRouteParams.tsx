import { useRouter } from 'next/router'

export const getRouteParams = (field = 'id') => {
  const router = useRouter()
  const param = router.query[field]
  return typeof param === 'string' ? param : ''
}
