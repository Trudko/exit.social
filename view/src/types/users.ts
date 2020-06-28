export interface UserInterface {
  username: string
  photoURL: string
  followersCount: number
  message?: string
}

export interface InfluencerInterface {
  influencer: UserInterface
}

export interface SessionInterface {
  session: UserInterface
}
