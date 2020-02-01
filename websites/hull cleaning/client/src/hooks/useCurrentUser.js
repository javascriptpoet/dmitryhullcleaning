import { useContext } from "react"
import { CurrentUserContext } from "../components/CurrentUserContext"

const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext)

  return currentUser
}

export default useCurrentUser
