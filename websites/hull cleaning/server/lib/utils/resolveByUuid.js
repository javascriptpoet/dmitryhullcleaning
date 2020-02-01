import resolveByFilter from './resolveByFilter'

export default (collectionName)=>(...args)=>{
    const filter=({uuid},record)=>(uuid===record.uuid)
    const filteredRecords=resolveByFilter(filter,collectionName)
    return filteredRecords[0]
}