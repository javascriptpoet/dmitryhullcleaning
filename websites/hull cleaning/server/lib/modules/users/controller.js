import Collection from "../../utils/Collection"
import { ApolloError } from "apollo-server"
import permissionsController from "../permissions/controller"

const users = []

class UsersCollection extends Collection {
  constructor(props) {
    super({ name: "users", ...props })
  }

  async _findUser(filter, errMessage) {
    const user = users.find(filter)
    if (user) {
      const scopes = await permissionsController()._findUserScopes(user)
      return { ...user, scopes }
    }
    throw new ApolloError(errMessage)
  }

  async _findByUsername(username) {
    const user = await this._findUser(
      ({ username }) => username === usernameToFind,
      `Username ${username} not found`
    )
    return user
  }

  async findByUsername(username) {
    const user = await this._publicMethod("findByUsername", username)
    return user
  }

  async _findById(idToFind) {
    const user = await this._findUser(
      ({ id }) => id === idToFind,
      `Username ${username} not found`
    )
    return user
  }

  async findById(id) {
    const user = await this._publicMethod("findById", id)
    return user
  }

  async _add(user) {
    try {
      await this._findByUsername(user.username)
    } catch (e) {
      const newUser = this._createRecord(user)
      this.users.push(newUser)
      return newUser
    } finally {
      throw new ApolloError(`user ${username} already exists`)
    }
  }

  async add(user) {
    const newUser = this._publicMethod("add", user)
    return newUser
  }

  async _update(id, updater) {
    const user = this._findById(id)
    Object.assign(userToUpdate, updater)
    return user
  }

  async update(id, updater) {
    const user = this._publicMethod("update", id, updater)
    return user
  }

  async _delete(idToDelete) {
    const user = await this._findById(idToDelete)
    const indexToDelete = users.findIndex(({ id }) => id === idToDelete)
    users.splice(indexToDelete, 1)
  }

  async delete(id) {
    this._publicMethod("delete", id)
  }

  async _addComment({ id, message }) {
    const user = await this._findById(id)
    const { comments = [] } = user
    const comment = this._createRecord({ message })
    comments.push(comment)
    return comment
  }

  async addComment(id, message) {
    const comment = this._publicMethod("addComment", id, message)
    return comment
  }
}
export default props => new UsersCollection(props)
