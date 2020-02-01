import gql from 'graphql-tag'
//import resolveByUuid from '../utils/resolveByUuid'

const typeDefs=gql`
    type UserProfile {
        fullName:String
        firstName:String
        lastName:String
        username:String
        email:String
        #comments:[Comment]
    }
    type User {      
        uuid:ID!
        password:String!
        profile:UserProfile!
    }   
    extend type Query {
        currentUserProfile:UserProfile
        user(uuid:ID!):User
    }
`
const resolvers={
    Mutation:{},
    Query:{
        currentUserProfile:()=>{return {
            firstName:'Who',
            lastName:'youWho'
        }}
       // user:resolveByUuid('users')
    }
}
export default {typeDefs,resolvers}
