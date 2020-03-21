import { ApolloError } from "@apollo/client"

export class AuthorizationError extends ApolloError {
  constructor(...args) {
    super(...args)
    this.extensions.code = "UNAUTHORIZED"
  }
}
