export default class BinaryTree {
  static on(grid) {
    grid.cells.forEach(cell => {
      const neighbors = []
      if (cell.north) {
        neighbors.push(cell.north)
      }
      if (cell.east) {
        neighbors.push(cell.east)
      }
      const index = Math.floor(Math.random() * neighbors.length)
      if (neighbors[index]) {
        cell.link(neighbors[index])
      }
    })
  }
}
