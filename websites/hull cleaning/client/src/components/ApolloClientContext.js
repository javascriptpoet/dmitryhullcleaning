import React from "react"
import { ApolloProvider } from "@apollo/client"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const httpLink = createHttpLink({
  uri: "/graphql"
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
