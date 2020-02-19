import gql from "graphql-tag"
import Collection from "../utils/Collection"

const typeDefs = gql`
  type TaskCompletionStatus {
    percentCompleted: Number
    whatHappened: String
  }
  type TaskUpdate {
    createDate: String
    date: String
    completionStatus: TaskCompletionStatus
    comments: [Comment]
  }

  type TaskState {
    status: TaskStatus
    note: String
  }

  interface Task {
    id: ID
    type: String
    dateCreated: String
    state: TaskState
    updates: [TaskUpdate]
    PartialTaskIds: [ID]
    comments: [Comment]
  }

  type Mutation {
    addJob(input: AddJob): Job
    updateJob(id: ID, updater: AddJob): Job
    deleteJob(id: ID): ID
    addCommentToJob(id: ID, message: String): Comment
  }

  type Mutation {
    addBoat(input: AddLog): Log
    updateBoat(id: ID, updater: AddBoat): Log
    deleteBoat(id: ID): ID
    addCommentToBoat(id: ID, message: String): Comment
  }
`
const resolvers = {}

class BoatsCollection extends Collection {}
const collection = new BoatsCollection({ name: "Boats" })
export default { typeDefs, resolvers, collection }
