import React, { useRef } from "react"
import Hero from "../components/Hero"
import PageTitle from "../components/PageTitle"
import PageLayout from "../components/PageLayout"
import useCurrentUser from "../hooks/useCurrentUser"

const LoginPage = () => {
  const { login } = useCurrentUser()
  const usernameEl = useRef(null)
  const passwordEl = useRef(null)
  const loginEvent = e => {
    console.log(usernameEl.current.value, passwordEl.current.value)
    // e.stopPropagaton()
    login(usernameEl.current.value, passwordEl.current.value)
  }
  return (
    <PageLayout>
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="email"
            placeholder="Email"
            ref={usernameEl}
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
            class="input"
            type="password"
            placeholder="Password"
            ref={passwordEl}
          />
          <span class="icon is-small is-left">
            <i class="fas fa-lock"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-success" onClick={loginEvent}>
            Login
          </button>
        </p>
      </div>
    </PageLayout>
  )
}

export default LoginPage
