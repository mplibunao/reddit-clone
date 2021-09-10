import { useRouter } from 'next/router'

export const getRouteParams = (field = 'id') => {
  const router = useRouter()
  const param = router.query[field]
  return typeof param === 'string' ? param : ''
}

export const useGetIntId = () => {
  const router = useRouter()
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1

  return intId
}
