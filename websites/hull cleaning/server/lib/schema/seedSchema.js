import gql from 'graphql-tag'

const seedSchema={
    typeDefs:gql`
        type Void {
            void: Boolean
        }
        type Mutation {
            void:Void
        }
        type Query {
            void:Void
        }
        type Comment {
            uuid:ID
            body:String
            createdBy:User
            dateCreated:String
        }
        enum Status [inprogress,done]
    `,
    resolvers:{
        Mutation:{
            void:()=>true
        },
        Query:{
            void:()=>true
        },
        Void:()=>({void:false})
    }
}
export default seedSchema