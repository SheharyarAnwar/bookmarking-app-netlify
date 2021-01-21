import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import fetch from "isomorphic-fetch"
const link = new HttpLink({
  uri: "/.netlify/functions/create",
  fetch,
})
export const createApolloClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache(),

    link,
  })
}
