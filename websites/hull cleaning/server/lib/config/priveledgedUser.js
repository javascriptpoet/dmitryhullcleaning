import modules from "../modules"
import config from "getconfig"

const addPriveledgedUser = async () => {
  const {
    server: {
      priveledgedUser: { username, password }
    }
  } = config
  const {
    users: { controller: usersController }
  } = modules

  await usersController().add({ username, password, roles: ["admin"] })
}

export default addPriveledgedUser
