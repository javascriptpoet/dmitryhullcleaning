import { useState } from "react"

const hasLocalStorage = window && window.localStorage
const getInitialStateFromStorage = (key, initialValue) =>
  hasLocalStorage
    ? window.localStorage.getItem(key) || initialValue
    : initialValue

const useLocalStorage = (key, initialValue = {}) => {
  const [state, setState] = useState(
    getInitialStateFromStorage(key, initialValue)
  )

  const removeItem = () => {
    setState(null)
    if (hasLocalStorage) {
      window.localStorage.removeItem(key)
    }
  }

  const setItem = value => {
    setState(value)
    if (hasLocalStorage) {
      window.localStorage.setItem(key, value)
    }
  }

  return {
    get: () => state,
    set: value => setItem(value),
    clear: () => removeItem()
  }
}

export default useLocalStorage
