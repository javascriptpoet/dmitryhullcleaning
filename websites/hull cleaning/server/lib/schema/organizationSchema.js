import gql from 'graphql-tag'
import relationshipResolver from '../utils/relationshipResolver'

const typeDefs=gql`
    type UserDescriptor implements RelationshipInterface {
        name:String
        uuid:ID!
        relatedAs:[String]
    }   
`
const resolvers={
    UserDescriptor:relationshipResolver('organizations',({name})=>name)
}
export default {typeDefs,resolvers}