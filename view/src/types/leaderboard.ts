import { UserInterface } from 'types/users'

export interface LeaderInterface {
  username: string
  ethAddress?: string
  score: number,
  payoutScore: number
}

export interface LeaderboardInterface {
  leaderboard: {
    influencer: UserInterface,
    total: number
    followers: LeaderInterface[]
  }
}
