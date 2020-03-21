import { useForm } from "react-hook-form"
import { ApolloError } from "@apollo/client"

const useGqlForm = (...args) => {
  const useFormResult = useForm(...args)
  const { setError } = useFormResult

  const handleUserInputError = e => {
    if (e instanceof ApolloError) {
      const {
        extensions: { code, fieldErrors = [] }
      } = e
      if (code === "BAD_USER_INPUT") return setError(fieldErrors)
    }
    throw e
  }

  return {
    ...useFormResult,
    handleUserInputError
  }
}

export default useGqlForm
