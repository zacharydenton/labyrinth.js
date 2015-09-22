import Grid from "./environments/Grid"
import AldousBroder from "./generators/AldousBroder"
const grid = new Grid(10, 10)
AldousBroder.on(grid)
console.log(grid.toString())
