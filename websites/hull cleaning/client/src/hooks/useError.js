import { useState } from "react"

const useError = () => {
  const [error, setError] = useState(null)
  if (error) {
    const oldError = error
    setError(null)
    throw oldError
  }
  return setError
}

export default useError
