export default (obj = {}, filter) => {
  return Object.keys(obj).find(filter)
}
