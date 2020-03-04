const scopes = [
  "findByUsername",
  "findById",
  "add",
  "update",
  "delete",
  "addComment"
]
const scopeSpaces = {
  read: ["findByUsername", "findById"],
  write: ["add", "update", "delete", "addComment"]
}

export default { scopes, scopeSpaces }
