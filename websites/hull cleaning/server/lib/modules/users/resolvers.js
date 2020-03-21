//Mutations
async function addUser(_, { input: newUser }, { getController }) {
  const generatedNewUser = await getController("users").add(newUser)
  return generatedNewUser
}

async function updateUser(parent, { id, input: updater }, { getController }) {
  const updatedUser = await getController("users").update(id, updater)
  return updatedUser
}

async function deleteUser(parent, { id }, { getController }) {
  await getController("users").delete(id)
}

async function addCommentToUser(parent, { id, message }, { getController }) {
  const comment = await getController("users").addComment(id, message)
  return comment
}

const Mutation = { addUser, updateUser, deleteUser, addCommentToUser }

//Queries
const currentUser = async (parent, _, { getController }, info) => {
  return await getController("users").currentUser()
}

const Query = { currentUser }

export default {
  Mutation,
  Query
}
