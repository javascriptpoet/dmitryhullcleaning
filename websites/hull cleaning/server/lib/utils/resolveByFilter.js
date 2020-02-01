export default (filter,collectionName)=>(_,_,vars,{rootValue:store})=>{
    store[collectionName].filter((record)=>filter(vars,record))
}