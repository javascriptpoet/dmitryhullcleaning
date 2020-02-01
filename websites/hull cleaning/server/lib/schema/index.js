//import tasksSchema from './tasksSchema'
import gql from 'graphql-tag'
import mergeSchemaReducer from '../utils/mergeSchemaReducer'
import seedSchema from './seedSchema'
import userSchema from './userSchema'
import newVolunteerTaskSchema from './newVolunteerTaskSchema'

const schema=[seedSchema,userSchema,newVolunteerTaskSchema].reduce(mergeSchemaReducer,{
    resolvers:{
        Mutation:{},
        Query:{},
    },
    typeDefs:[]
})
export default schema