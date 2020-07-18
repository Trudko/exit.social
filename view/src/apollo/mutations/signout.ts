import gql from 'graphql-tag'

export default gql`
  mutation signOut {
    signOut @rest(path: "/auth/signout/") {
      influencerID
    }
  }
`
