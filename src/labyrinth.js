import Grid from "./environments/Grid"
import RecursiveBacktracker from "./generators/RecursiveBacktracker"
const grid = new Grid(10, 10)
RecursiveBacktracker.on(grid)
console.log(grid.toString())
