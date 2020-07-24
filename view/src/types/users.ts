export interface UserInterface {
  username: string
  photoURL: string
  followersCount: number
  message?: string
  onboarded: boolean,
  allowPayout: boolean
}

export interface InfluencerInterface {
  influencer: UserInterface
}

export interface SessionInterface {
  session: UserInterface
}
