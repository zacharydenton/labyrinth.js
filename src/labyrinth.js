import Grid from "./environments/Grid"
import BinaryTree from "./generators/BinaryTree"
const grid = new Grid(10, 10)
BinaryTree.on(grid)
console.log(grid.toString())
