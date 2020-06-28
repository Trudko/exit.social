import gql from 'graphql-tag'

export default gql`
  mutation payout($payoutData: [PayoutData]!) {
    payout(input: $payoutData, body: $payoutData)
    @rest(type: "Payout", path: "/payout", method: "POST") {
      followerID
    }
  }
`
