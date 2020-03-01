const getToken = userId => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET)

  return token
}

export default getToken
