import routes from "../../routes"

const menuFromRout = ([label, routeName]) => {
  const { path, scopes } = routes[routeName]
  return { path, scopes, label }
}
const mainMenu = [
  {
    label: "Request Service",
    subMenu: [
      ...[
        ["Hull Cleaning", "requestHullCleaning"],
        ["Zink Service", "requestZinkService"],
        ["Underwater Inspection", "requestUnderwaterInspection"],
        ["Item Retreival", "requestItemRetreival"],
        ["Other", "requestOther"]
      ].map(menuFromRout)
    ]
  },
  ...[
    ["Our Prices", "pricing"],
    ["Contact", "contact"],
    ["About", "about"],
    ["Admin", "adminDashboard"]
  ].map(menuFromRout)
]

export default mainMenu
