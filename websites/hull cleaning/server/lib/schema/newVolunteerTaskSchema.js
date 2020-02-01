import gql from "graphql-tag"
import resolveByUuid from "../utils/resolveByUuid"
import resolveByFilter from "../utils/resolveByFilter"

const typeDefs = gql`
  type NewVolunteerInfo {
    #new volunteers will have to register as part of new volunteer form
    userProfile: UserProfile
    preferences: [string]
    notes: String
  }

  type NewVolunteerTask {
    newVolunteerInfo: NewVolunteerInfo
    status: Status
    comments: Comments
  }
`
