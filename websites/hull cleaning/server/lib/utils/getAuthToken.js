import jwt from "jsonwebtoken"

const getAuthToken = userId => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET)

  return token
}

export default getAuthToken
