import React from "react"
import { ApolloProvider } from "@apollo/client"
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql"
  })
})

export const ApolloClientContext = React.createContext(client)

export const ApolloClientProvider = ({ children }) => {
  return (
    <ApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ApolloClientContext.Provider>
  )
}
