import rawRoutes from "../routes.json"

const routes = Object.entries(rawRoutes).map(([key, { path, component }]) => ({
  key,
  path: `${path}/*`,
  component
}))

const menuLinks = Object.entries(rawRoutes).map(([key, { path, label }]) => ({
  key,
  to: path,
  label
}))

const useRoutes = () => ({
  getRoutes: () => routes,
  getMenuLinks: () => menuLinks
})

export default useRoutes
