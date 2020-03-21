import React from "react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { createHttpLink } from "apollo-link-http"

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

export const ApolloClientContext = React.createContext(client)

const ApolloClientProvider = ({ children }) => {
  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  )
}
export default ApolloClientProvider
