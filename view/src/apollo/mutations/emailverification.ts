import gql from 'graphql-tag'

export default gql`
  mutation ResendEmail($influencerID: string,, $followerID: string) {
    resendEmail(influencerID: $influencerID, followerID: $followerID, input: {}, body: {})
    @rest(path: "/influencers/{args.influencerID}/verify/{args.followerID}/", method: "PUT") {
      followerID
    }
  }
`
