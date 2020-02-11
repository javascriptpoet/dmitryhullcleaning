const intersection = (arr1 = [], arr2 = []) => {
  return arr1.reduce((res, item) => {
    arr2.includes(item) && res.push(item)
    return res
  }, [])
}
export default intersection
