import Grid from "./environments/Grid"
import Sidewinder from "./generators/Sidewinder"
const grid = new Grid(10, 10)
Sidewinder.on(grid)
console.log(grid.toString())
