import Controller from "../../utils/Controller"
import { ApolloError } from "apollo-server"
import permissionsController from "../permissions/controller"
import R from "ramda"

let users = []

class UsersController extends Controller {
  constructor(props) {
    super({ name: "users", ...props })
  }

  async _findUser(filter, errMessage) {
    console.log("findUser", users)
    const user = users.find(filter)
    if (!user) throw new ApolloError(errMessage)
    const permissionsController = this._getController("permissions")
    user.scopes = permissionsController._resolvePermissions(
      user.allowed,
      user.disallowed
    )
    return user
  }

  async _findByUsername(usernameToFind) {
    console.log(users)
    const user = await this._findUser(({ username }) => {
      console.log(
        "findByUsername",
        username,
        usernameToFind,
        usernameToFind === username
      )
      return username === usernameToFind
    }, `Username ${usernameToFind} not found`)
    return user
  }

  async findByUsername(username) {
    const user = await this._publicMethod("findByUsername", username)
    return user
  }

  async _findById(idToFind) {
    const user = await this._findUser(
      ({ id }) => id === idToFind,
      `Username ${idToFind} not found`
    )
    return user
  }

  async findById(id) {
    const user = await this._publicMethod("findById", id)
    return user
  }

  async _add(user) {
    const { username } = user
    try {
      await this._findByUsername(username)
    } catch (e) {
      const newUser = this._createRecord(user)
      users.push(newUser)
      return newUser
    }
    throw new ApolloError(`user ${username} already exists`)
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

  async _currentUser() {
    return await this.getCurrentUser()
  }

  async currentUser(...args) {
    return this._publicMethod("currentUser", ...args)
  }
}
export default props => new UsersController(props)
