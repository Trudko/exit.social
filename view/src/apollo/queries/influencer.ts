// import { InfluencerInterface } from 'types/users'

import gql from 'graphql-tag'

export default gql`
  query influencer($id: String!) {
    influencer(id: $id)
      @rest(type: "Influencer", path: "/influencers/{args.id}") {
      username
      photoURL
      message
      followersCount
      onboarded,
      allowPayout
    }
  }
`
