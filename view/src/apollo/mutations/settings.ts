import gql from 'graphql-tag';

export default gql`
  mutation SaveSettings($influencerID: string, $settingsData: [Settings]!) {
    settings(influencerID: $influencerID, input: $settingsData, body: $settingsData)
    @rest(type: "Settings", path: "/influencers/{args.influencerID}/settings", method: "PUT") { 
      followerID
    }
  }
`