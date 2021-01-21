import { ApolloClient, InMemoryCache } from "@apollo/client"

export const createApolloClientWithTokenContext = () => {
  return new ApolloClient({
    uri: "/.netlify/functions/create",
    cache: new InMemoryCache(),
  })
}
