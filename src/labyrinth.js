import Grid from "./environments/Grid"
import HuntAndKill from "./generators/HuntAndKill"
const grid = new Grid(10, 10)
HuntAndKill.on(grid)
console.log(grid.toString())
