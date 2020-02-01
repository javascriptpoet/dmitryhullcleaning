import { useContext } from "react"
import StateContext from "../components/StateContext"

const useState = () => {
  const state = useContext(StateContext)

  return state
}

export default useState