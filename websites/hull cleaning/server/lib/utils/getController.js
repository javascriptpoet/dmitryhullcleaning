const getController = ({ name, getCurrentUser, controllers }) => {
  if (!controllers[name])
    throw new ApolloError(`missing required module ${name}`)
  return controllers[name]({ getCurrentUser, controllers })
}

export default getController
