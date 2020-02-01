const relationshipResolver=(collectionName,resolveCustomFields)=>(parent,_,_,{fieldName,rootValue:mockStore})=>{
    const relationship=parent[fieldName]
    const collectionRecord=mockStore[collectionName].filter(({uuid})=>(uuid===relationship.uuid))
    return {...relationship,
        uuid:!!collectionRecord && collectionRecord.uuid,
        ...resolveCustomFields(collectionRecord || {},relationship)
    }
}
export default relationshipResolver