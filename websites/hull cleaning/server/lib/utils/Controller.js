import { EventEmitter, captureRejectionSymbol } from "events"
import { AuthenticationError, ApolloError } from "apollo-server-express"
import { all } from "ramda"
import UUID from "uuid"
import getController from "../utils/getController"

const Controller = class Controller extends EventEmitter {
  constructor({ name, getCurrentUser, controllers = {} }) {
    const controller = super({ captureRejections: true })
    Object.assign(controller, { name, getCurrentUser, controllers })
  }

  _getController(name) {
    const { getCurrentUser, controllers } = this
    return getController({ name, getCurrentUser, controllers })
  }

  _createRecord(record) {
    return {
      ...record,
      id: UUID(),
      dateCreated: Date(),
      ownerId: this.currentUser.id
    }
  }

  async _handlePermissions(opName) {
    const opScope = `${this.name}.${opName}`
    const currentUser = await this.getCurrentUser()
    if (!currentUser.scopes.includes(opScope))
      throw new AuthenticationError(`${opScope}: operation not authorized`)
  }

  async _publicMethod(methodName, ...methodArgs) {
    await this._handlePermissions(methodName)
    this.emit(`before ${methodName}`, ...methodArgs)
    const methodRes = await this[`_${methodName}`](...methodArgs)
    this.emit(`after ${methodName}`, methodRes, ...methodArgs)
    return methodRes
  }

  [captureRejectionSymbol](err, event, ...args) {
    console.log(
      `Controller ${this.name}: event ${event}: err=${err}: args=${args}`
    )
    this.destroy(err)
  }
}

export default Controller
