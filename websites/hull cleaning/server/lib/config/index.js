import registerPermissions from "./registerPermissions"
import "./auth"
import addPriveledgedUser from "./priveledgedUser"

const configure = async () => {
  await registerPermissions()
  await addPriveledgedUser()
}
export default configure
