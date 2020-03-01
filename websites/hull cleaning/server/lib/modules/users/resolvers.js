import Ramda from "ramda"

//Mutations
async function addUser(
  _,
  { input: newUser },
  { controllers: { usersController } }
) {
  const generatedNewUser = await usersController.add(newUser)
  return generatedNewUser
}

async function updateUser(
  parent,
  { id, input: updater },
  { controllers: { usersController } }
) {
  const updatedUser = await usersController.update(id, updater)
  return updatedUser
}

async function deleteUser(
  parent,
  { id },
  { controllers: { usersController } }
) {
  await usersController.delete(id)
}

async function addCommentToUser(
  parent,
  { id, message },
  { controllers: { usersController } }
) {
  const comment = await usersController.addComment(id, message)
  return comment
}

const mutation = { addUser, updateUser, deleteUser, addCommentToUser }

//Queries
const currentUser = async function currentUser(parent, _, { user }, info) {
  return Ramda.pick(
    [
      "createDate",
      "comments",
      "fullname",
      "username",
      "email",
      "phone",
      "commMethod",
      "roles",
      "allowedScopes",
      "disallowedScopes",
      "scopes"
    ],
    user
  )
}

export const resolvers = {
  mutation,
  query
}
