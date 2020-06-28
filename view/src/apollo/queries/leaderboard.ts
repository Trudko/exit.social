import gql from 'graphql-tag'

export default gql`
  query leaderboard($influencerID: String!) {
    leaderboard(influencerID: $influencerID)
    @rest(type: "Leaderboard", path: "/influencers/{args.influencerID}/leaderboard") {
      influencer {
        photoURL
      }
      followers {
        username
        ethAddress
        score
        payoutScore
        verified
      }
      total
    }
  }
`
