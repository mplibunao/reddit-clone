import DataLoader from 'dataloader'
import { User } from '../entities'

// keys of userIds: [1232-2312-23123, 2313-321321-3123-31231]
// returns [User, User]
export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await User.findByIds(userIds as string[])

    const userIdToUser: Record<string, User> = {}
    users.forEach((user) => {
      userIdToUser[user.id] = user
    })

    return userIds.map((userId) => userIdToUser[userId])
  })
