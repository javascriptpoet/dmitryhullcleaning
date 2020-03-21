import jwt from "jsonwebtoken"
import config from "getconfig"

const getAuthToken = payload => {
  const token = jwt.sign(payload, config.server.jwtSecret)

  return token
}

export default getAuthToken
