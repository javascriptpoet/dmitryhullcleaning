import { useContext } from "react"
import DispatchContext from "../components/DispatchContext"

const useDispatch = () => {
  const dispatch = useContext(DispatchContext)

  return dispatch
}

export default useDispatch
