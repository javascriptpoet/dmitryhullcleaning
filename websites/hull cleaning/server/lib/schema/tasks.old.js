import gql from 'graphql-tag'

const typeDefs=gql`
    #descriptor types are used to reference related types for future lazy queries while
    #providing some info for parent query consumption
    # they are decorated pointers and can be imbedded in any parent type to establish a relationship
    type UserDescriptor {
        fullName:String
        #descriptors must point to a type with uuid. This is uuid of related type
        uuid:ID!
        #Description of relationship such as creator/parent/child
        relatedAs:[String]
    }
    type OrganizationDescriptor {
        fullName:String!
        uuid:ID!
        #Description of relationship such as creator/parent/child
        relatedAs:String
    }

    #Used by client to display task cards for any kind of task
    type TaskCard {
        uuid:ID!
        #Type/kind of task such as 'newVolunteer'
        kind:String!
        #specific to each kind of task to be displayed as card title
        title:String!
        #optional short description where needed. Maybe, not for newVolunteerTask but, perhaps, for fixTruckTask
        description:String
        dateCreated:String!
        #All tasks have expiration date. It might or might not be the same as dateCompleted
        #Expired tasks dont generate notifications
        dateToExpire:String
        #Tasks can expire before being completed
        dateCompleted:String
        #Value of state is type-of-task dependant
        status:String
        #users associated with task. Creator, owner might or might not be in array of refs
        relatedUsers:[UserDescriptor]
        relatedOrganizations:[OrganizationDescriptor]
    }

    #Description of task kind
    type KindOfTask {
        uuid:ID!
        #to be displayed as label
        title:String!
        description:String
    }


    #Minimum implementation of task
    interface TaskInterface {
        uuid:ID!
        kindOfString

    }
    #used to display on newVolunteerTask form
    type NewVolunteerTask implements TaskInterface {
        uuid:ID!
        #ref to volunteer user record. It might not exist yet. Only new volunter info is recorded when task is created
        #when volunteer creates account, his volunteer info is accessed thru email. 
        newVolunteerUserRecord:Relationship
        #Info from newVolunteer form
        newVolunteerInfo:NewVolunteerInfo

    }
    extend type Query {
        #returns list of all tasks sorted in the order specific to current user
        allTaskCards:[TaskCard]
        newVolunterTasks(input:[ID]):[NewVolunteerTask]
    }
`
const resolvers={
    Query
}