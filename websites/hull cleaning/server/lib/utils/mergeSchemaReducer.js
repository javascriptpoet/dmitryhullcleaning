const mergeSchemaReducer=(accSchema,schema)=>{
    console.log(accSchema,schema)
    const {
        typeDefs:accTypeDefs,
        resolvers:accResolvers,
        ...restAccResolvers
    }=accSchema
    const {typeDefs=[],resolvers={},...restResolvers}=schema || {}
    return {
        typeDefs:[...accTypeDefs,...typeDefs],
        resolvers:{
            ...restAccResolvers,...restResolvers,
            Mutation:{...(accResolvers.Mutation || {}),...(resolvers.Mutation || {})},
            Query:{...(accResolvers.Query || {}),...(resolvers.Query || {})}
        }
    }
}
export default mergeSchemaReducer