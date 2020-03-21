import React from "react"

const ErrorModal = ({ error }) => {
  return (
    <div class="modal">
      <div class="modal-background" />
      <div class="modal-content">
        <h1>
          {`${error.extensions ? error.extensions.code : ""}. ${error.message}`}
        </h1>
      </div>
      <button class="modal-close is-large" aria-label="close" />
    </div>
  )
}

class ErrorBoundary extends React.Component {
  constructor() {
    super()
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, errorInfo) {
    console.log(errorInfo, error)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
        {this.state.hasError ? <ErrorModal error={this.state.error} /> : null}
      </React.Fragment>
    )
  }
}

export default ErrorBoundary
