import React from "react"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { createHttpLink } from "apollo-link-http"

const httpLink = createHttpLink({
  uri: "http://localhost:3000/graphql"
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
})

export const ApolloClientContext = React.createContext(client)

export const ApolloClientProvider = ({ children }) => {
  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  )
}
