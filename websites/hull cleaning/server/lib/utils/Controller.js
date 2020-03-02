import { EventEmitter, captureRejectionSymbol } from "events"
import { AuthenticationError } from "apollo-server"
import { all } from "ramda"

const Controller = class Collection extends EventEmitter {
  constructor({ name, currentUser = { scopes: [] } }) {
    const collection = super({ captureRejections: true })
    collection.name = name
    this.currentUser = currentUser
  }

  _createRecord(record) {
    return {
      ...record,
      id: UUID(),
      dateCreated: Date(),
      ownerId: this.currentUser ? currentUser.id : undefined
    }
  }

  _handlePermissions(opName) {
    const opScope = `${this.name}.${opName}`
    if (!this.currentUser.scopes.includes(opScope))
      throw new AuthenticationError(`${opScope}: operation not authorized`)
  }

  async _publicMethod(methodName, ...methodArgs) {
    this._handlePermissions(methodName)
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
