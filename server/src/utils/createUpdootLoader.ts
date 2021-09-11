import DataLoader from 'dataloader'
import { Updoot } from '../entities'

interface updootLoaderParams {
  postId: string
  userId: string
}

export const createUpdootLoader = () =>
  new DataLoader<updootLoaderParams, Updoot | null>(async (keys) => {
    const updoots = await Updoot.findByIds(keys as updootLoaderParams[])
    const updootIdsToUpdoot: Record<string, Updoot> = {}
    updoots.forEach((updoot) => {
      updootIdsToUpdoot[`${updoot.userId}|${updoot.postId}`] = updoot
    })

    return keys.map((key) => updootIdsToUpdoot[`${key.userId}|${key.postId}`])
  })
