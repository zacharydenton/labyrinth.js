import Grid from "./environments/Grid"
import Wilsons from "./generators/Wilsons"
const grid = new Grid(10, 10)
Wilsons.on(grid)
console.log(grid.toString())
