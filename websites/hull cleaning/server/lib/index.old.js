const { ApolloServer } = require("apollo-server")
import { reduce } from "ramda"
//import schema from './schema'
import gql from "graphql-tag"
import { TIMEOUT } from "dns"

const seedSchema = {
  typeDefs: gql`
    type Void {
      void: Boolean
    }
    enum Condition {
      VERY_POOR
      POOR
      OK
      GOOD
      EXCELLENT
    }

    type Mutation {
      void: Void
    }
    type Query {
      void: Void
    }
  `,
  resolvers: {
    Mutation: {
      void: () => true
    },
    Query: {
      void: () => true
    },
    Void: () => ({ void: false })
  }
}

const commentSchema = {
  typeDefs: gql`
    input AddComment {
      toCommentId: ID
      message: String
    }
    type Comment {
      id:ID
      ownerId: ID
      dateCreated:String
      message:String
      comments:[Comment]
    }

    type  Mutation:{
      addComment(input: AddComment): Comment
      updateComment(id: ID, updater: AddComment): Comment
      deleteComment(id:ID): ID
    }
  `,
  resolvers: {}
}

const contactSchema = {
  typeDefs: gql`
    enum ComMethod {
      EMAIL
      VOICE
      TEXT
    }
    input AddContact {
      fullName: String
      comMethod: ComMethod
      email: String
      phone: String
      message: String
    }
    type Contact {
      id: ID
      fullName: String
      comMethod: ComMethod
      email: String
      phone: String
      message: String
      createDate: String
      comments: [Comment]
    }

    type Mutation {
      addContact(input: AddContact): Contact
      updateContact(id: ID, updater: AddContact): Contact
      deleteContact(id:ID) ID
      addCommentToContact(id:ID,message:String):Comment
    }
  `
}

const userSchema = {
  typeDefs: gql`
    enum UserRole {
      CLIENT
      ADMIN
    }
    type UserProfile {
      fullName: String
      username: String
      email: String
      phone: String
      comMethod: ComMethod
      role: UserRole
    }

    type User {
      id: ID
      profile: UserProfile
      password: String
      createDate: String
      comments: [Comment]
    }
    input AddUser {
      profile: UserProfile
      password: String
    }

    type Mutation {
      addUser(input: AddUser): User
      updateUser(id: ID, updater: AddUser): User
      deleteUser(id: ID): ID
      addCommentToUser(id: ID, message: String): Comment
    }
  `
}

const logSchema = {
  typeDefs: gql`
    enum EventType {
      NEW_CONTACT
    }
    type Log {
      id: ID
      eventType: EventType
      message: String
      dateCreated: String
      ownerId: ID
    }
    input AddLog {
      eventType: EventType
      message: String
    }

    type Mutation {
      addLog(input: AddLog): Log
      updateLog(id: ID, updater: AddLog): Log
      deleteLog(id: ID): ID
    }
  `
}

const boatSchema = {
  typeDefs: gql`
    enum BoatType {
      SAILBOAT
      MOTORBOAT
    }
    type Boat {
      id: ID
      ownerUserId: ID
      createDate: String
      name: String
      marina: String
      slip: String
      zinks: String
      type: BoatType
      make: String
      length: Number
      comments: [Comment]
    }
    input AddBoat {
      ownerUserId: ID
      name: String
      marina: String
      slip: String
      zinks: String
      type: BoatType
      make: String
    }

    type Mutation {
      addBoat(input: AddLog): Log
      updateBoat(id: ID, updater: AddBoat): Log
      deleteBoat(id: ID): ID
      addCommentToBoat(id: ID, message: String): Comment
    }
  `
}

const taskSchema = {
  typeDefs: gql`
    type TaskUpdate {
      createDate:String
      date:String
      percentCompleted:Number
      invoiceId:ID
      comments:[Comment]
    }
    enum JobStatus {
      NOT_SCHEDULED
      SCHEDULED
      IN_PROGRESS
      COMPLETED 
    }
    interface Job {
      id:ID
      dateCreated:String
      priceQuoted:Number
      status:JobStatus
      fragments:[JobFragment]
      jobs:{Job}
      comments:[Comment]
    }

    type Mutation {
      addJob(input: AddJob): Job
      updateJob(id: ID, updater: AddJob): Job
      deleteJob(id: ID): ID
      addCommentToJob(id:ID,message:String):Comment
    } `
}

const HullCleanJobSchema = {
  typeDefs: gql`
    enum Growth {
      SHORT_ALGAE
      LONG_ALGAE
      SOFT_SHELLS
      HARD_SHELLS
      HEAVY_HARD_SHELLS
    }
    type HullCleanJob implements Job {
      id:ID
      dateCreated:String
      status:JobStatus
      tries:[JobTry]
      jobs:{Job}
      comments:[Comment]
      boatId: ID
      padColor: PadColor
      paintCondition: Condition
      zinkCondition: Number
      runningGearCondition: Condition
      growth: Growth
    }
    input AddHullClean {
      boatId: ID
      padColor: PadColor
      paintCondition: Condition
      zinkCondition: Number
      runningGearCondition: Condition
      growth: Growth
    }


    type Mutation {
      addJob(input: AddJob): Job
      updateJob(id: ID, updater: AddJob): Job
      deleteJob(id: ID): ID
      addCommentToJob(id:ID,message:String):Comment
    } `
}

const typeDefs = gql`

  input AddComment {
    toCommentId: ID
    message: String
  }
  type Comment {
    id:ID
    ownerId: ID
    dateCreated:String
    message:String
    comments:[Comment]
  }

  enum ComMethod {
    EMAIL
    VOICE
    TEXT
  }
  input AddContact {
    fullName: String
    comMethod: ComMethod
    email: String
    phone: String
    message: String
  }
  type Contact {
    id: ID
    fullName: String
    comMethod: ComMethod
    email: String
    phone: String
    message: String
    createDate: String
    comments: [Comment]
  }
  enum UserRole {
    CLIENT
    ADMIN
  }
  type UserProfile {
    fullName: String
    username: String
    email: String
    phone: String
    comMethod: ComMethod
    role: UserRole
  }
  
  type User {
    id: ID
    profile: UserProfile
    password: String
    createDate: String
    comments:[Comment]
  }
  input AddUser {
    profile: UserProfile
    password: String
  }

  enum EventType {
    NEW_CONTACT
  }
  type Log {
    id: ID
    eventType: EventType    
    message: String
    dateCreated: String
    ownerId:ID
  }
  input AddLog {
    eventType: EventType
    message: String
  }

  enum BoatType {
    SAILBOAT
    MOTORBOAT
  }
  type Boat {
    id: ID
    ownerUserId: ID
    createDate: String
    name: String
    marina: String
    slip: String
    zinks: String
    type: BoatType
    make: String
    length: Number
    comments:[Comment]
  }
  input AddBoat {
    ownerUserId: ID
    name: String
    marina: String
    slip: String
    zinks: String
    type: BoatType
    make: String
  }

  type JobTry {
    date:String
    percentCompleted:Number
    comments:[Comment]
  }
  enum JobStatus {
    SCHEDULED
    IN_PROGRESS
    COMPLETED 
    NOT_SCHEDULED
  }
  interface Job {
    id:ID
    dateCreated:String
    status:JobStatus
    tries:[JobTry]
    jobs:{Job}
    comments:[Comment]
  }

  enum PadColor {
    WHITE
    RED
    GREEN
    BROWN
  }
  enum Condition {
    VERY_POOR
    POOR
    OK
    GOOD
    EXCELLENT
  }
  enum Growth {
    SHORT_ALGAE
    LONG_ALGAE
    SOFT_SHELLS
    HARD_SHELLS
    HEAVY_HARD_SHELLS
  }
  type HullClean implements Job {
    id:ID
    dateCreated:String
    status:JobStatus
    tries:[JobTry]
    jobs:{Job}
    comments:[Comment]
    boatId: ID
    padColor: PadColor
    paintCondition: Condition
    zinkCondition: Number
    runningGearCondition: Condition
    growth: Growth
  }
  input AddHullClean {
    boatId: ID
    padColor: PadColor
    paintCondition: Condition
    zinkCondition: Number
    runningGearCondition: Condition
    growth: Growth
  }


  type Mutation {
    addContact(input: AddContact): Contact
    addUser(input: AddUser): ID
    updateUser(id: ID, updater: User): User
    deleteUser(id: ID): Void
    addLog(input: AddLog): Log
    addBoat(input: AddBoat): Boat
    updateBoat(id: ID, updater: AddBoat): Boat
    deleteBoat(id: ID): Void
    addComment(input: AddComment): Comment
    updateComment(id: ID, updater: AddCommentInput): Comment
    deleteComment(id: ID): Void
    addHullClean(input: AddHullCleanInput): HullClean
    updateHullClean(id: ID, updater: AddHullCleanInput): HullClean
    deleteHullClean(id: ID): Void
  }
`
const resolvers = {
  Mutation: {},
  Query: {
    currentUserProfile: () => {
      return {
        firstName: "Who",
        lastName: "youWho"
      }
    },
    isRegistered: () => {
      return new Promise((resolve, reject) =>
        setTimeout(() => resolve(true), 2000)
      )
    },
    tasks: () => {
      return [
        {
          id: "1",
          summary: "erf",
          status: 1
        }
      ]
    },
    TaskIds: () => {
      const ids = [{ id: "1" }, { id: "2" }, { id: "3" }]
      return new Promise(resolve => setTimeout(() => resolve(ids), 2000))
    },
    Task: (_, vars) => {
      const task = {
        id: vars.id,
        status: {
          label: "onHold",
          reason: "waiting for email"
        },
        summary: "its all about money"
      }
      console.log(task)
      return new Promise(resolve => setTimeout(() => resolve(task), 1000))
    }
  }
}
const server = new ApolloServer({
  typeDefs,
  resolvers,
  rootValue: mockStore,
  graphiql: true,
  pretty: true
})
server
  .listen()
  .then(({ url }) => console.log(`Running a GraphQL API server at ${url}`))
