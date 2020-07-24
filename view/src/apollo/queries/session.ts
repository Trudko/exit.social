// import { SessionInterface } from 'types/users'

import gql from 'graphql-tag'

export default gql`
  query session {
    session @rest(type: "Session", path: "/auth/session") {
      username
      photoURL
      followersCount
      message
      onboarded,
      allowPayout
    }
  }
`
