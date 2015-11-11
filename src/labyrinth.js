import Grid from "./environments/Grid"
import BinaryTree from "./generators/BinaryTree"
import RecursiveBacktracker from "./generators/RecursiveBacktracker"
const grid = new Grid(10, 10)
//RecursiveBacktracker.on(grid)
BinaryTree.on(grid)
console.log(grid.toString())
for (let row = 0; row < grid.height; row++) {
  console.log(grid.grid.slice(row * grid.width, (row + 1) * grid.width).join(" "));
}
