import modules from "../modules"
import config from "getconfig"

const addPriveledgedUser = async () => {
  const {
    server: {
      priveledgedUser: { username, password }
    }
  } = config
  const {
    controllers: { users: usersController }
  } = modules
  const adminUser = await usersController()._add({
    username,
    password,
    roles: ["admin"]
  })
  console.log("addPrivyUser", adminUser)
}

export default addPriveledgedUser
