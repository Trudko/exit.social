export interface FollowerInterface {
  username: string
  email: string
  photoURL: string
  followersCount: number
  verified: boolean
  status: 'converted' | 'pending'
}

export interface FollowersInterface {
  followers: {
    total: number
    values: FollowerInterface[]
  }
}
