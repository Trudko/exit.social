// import { FollowersInterface } from 'types/followers'

import gql from 'graphql-tag'

export default gql`
  query followers {
    followers @rest(type: "Followers", path: "/followers") {
      total
      values {
        username
        email
        photoURL
        followersCount
        verified
        status
      }
    }
  }
`
