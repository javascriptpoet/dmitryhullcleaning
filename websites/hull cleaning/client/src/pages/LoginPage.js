import React, { useRef, useContext } from "react"
import Hero from "../components/Hero"
import PageTitle from "../components/PageTitle"
import PageLayout from "../components/PageLayout"
import { CurrentUserContext } from "../components/AppProvider"
import { useFormContext, FormContext } from "react-hook-form"
import onError from "../utils/onError"
import useError from "../hooks/useError"
import useGqlForm from "../hooks/useGqlForm"
import { DevTool } from "react-hook-form-devtools"
import classnames from "classnames"
import { string, object } from "yup"
import { navigate } from "@reach/router"

export const LoginFields = () => {
  const { register } = useFormContext()

  return (
    <React.Fragment>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            name="email"
            class="input"
            type="email"
            placeholder="Email"
            ref={register}
          />
          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
          <span class="icon is-small is-right">
            <i class="fas fa-check"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input
            name="password"
            class="input"
            type="password"
            placeholder="Password"
            ref={register}
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
    </React.Fragment>
  )
}

export const validationSchema = object().shape({
  email: string()
    .ensure()
    .required("required")
    .email("invalid email"),
  password: string().min(6, "at least 6 characters")
})

const LoginPage = () => {
  const { login } = useContext(CurrentUserContext)
  const {
    register,
    handleSubmit,
    control,
    formState,
    handleUserInputError
  } = useGqlForm({
    validationSchema
  })
  const setError = useError()

  const submitButtonClass = classnames("button", "is-success", {
    loading: formState.isSubmitting
  })
  const onSubmit = data => {
    const { loading } = login(data, {
      onError: onError(handleUserInputError, e => setError(e)),
      onComplited: () => {
        navigate("/")
      },
      onDone: () => {
        formState.isSubmitted = true
      }
    })
  }
  return (
    <PageLayout>
      <FormContext {...{ register }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoginFields />
          <div class="field">
            <p class="control">
              <button type="submit" class={submitButtonClass}>
                Login
              </button>
            </p>
          </div>
        </form>
      </FormContext>
      <DevTool control={control} />
    </PageLayout>
  )
}

export default LoginPage
