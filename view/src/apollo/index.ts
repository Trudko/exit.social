import { ApolloClient, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'

const restLink = new RestLink({
  uri: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
  credentials: 'include'
})

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache()
})

export default client
