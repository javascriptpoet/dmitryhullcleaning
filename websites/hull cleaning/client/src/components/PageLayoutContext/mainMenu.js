import routes from "../../routes"

const menuFromRout = ([label, routeName]) => ({
  label,
  path: routes[routeName].path
})
const mainMenu = [
  ...[
    ["Our Prices", "pricing"],
    ["Contact", "contact"],
    ["About", "about"]
  ].map(menuFromRout),
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
  }
]

export default mainMenu
