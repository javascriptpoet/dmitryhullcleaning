import { useContext } from "react"
import { ApolloClientContext } from "../components/ApolloClientContext"

const useApolloClient = () => {
  const client = useContext(ApolloClientContext)

  return client
}

export default useApolloClient
