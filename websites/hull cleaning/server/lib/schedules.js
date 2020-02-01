import gql from "graphql-tag"

const typeDefs = gql`
  interface Schedule {
    note:String
    isFlexible:Boolean
  }

  type RecuringSchedule {
    note:String
    isFlexible:Boolean
    interval: Number
    timeWindowToStart:Number
    isApprovalRequired: Boolean
  }

  type ByRequestSchedule {
    void: Void
  }

  type SpecificDateSchedule {
    date: String
  }

  type TimeWindowSchedule {
    startDate:String
    endDate:String
  }

  Multipl

  enum BoatType {
    SAILBOAT
    MOTORBOAT
  }
  enum CleaningSubscriptionType {
    PERIODIC
    BY_REQUEST
    PERIODIC_REMINDERS
  }
  type CleaningSubscription {
    type: CleaningSubscriptionType
    frequencyInMonths: Number
  }
  enum ZinkType {
    SHAFT
    ROUND
    PLATE
  }
  type Zink {
    type: ZinkType
    size: String
  }
  type Boat {
    id: ID
    ownerId: ID
    createDate: String
    name: String
    marina: String
    slip: String
    zinks: [Zink]
    type: BoatType
    make: String
    cleaningSubscription: CleaningSubscription
    comments: [Comment]
  }
  input AddBoat {
    ownerId: ID
    name: String
    marina: String
    slip: String
    zinks: String
    type: BoatType
    make: String
    cleaningSubscription: CleaningSubscription
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
