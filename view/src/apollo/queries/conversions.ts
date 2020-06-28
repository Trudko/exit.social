import gql from 'graphql-tag'

export default gql`
  query conversions {
    conversions @rest(type: "Conversions", path: "/crypto/conversions") {
      symbol
      price
    }
  }
`
