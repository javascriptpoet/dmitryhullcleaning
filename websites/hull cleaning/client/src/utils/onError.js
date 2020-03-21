const onError = (...errorHandlers) => e => {
  const { isHandled, lastError } = errorHandlers.reduce(
    (acc, errorHandler) => {
      try {
        errorHandler(lastError)
        return { ...acc, isHandled: true }
      } catch (newError) {
        return { ...acc, lastError: newError }
      }
    },
    { isHandled: false, lastError: e }
  )
  if (!isHandled) throw lastError
}

export default onError
