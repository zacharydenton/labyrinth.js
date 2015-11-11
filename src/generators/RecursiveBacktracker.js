export default class RecursiveBacktracker {
  static on(grid) {
    const stack = []
    stack.push(grid.randomCell())
    while (stack.length > 0) {
      const current = stack.pop()
      const {row, column} = current
      const neighbors = grid.neighbors(row, column).filter(neighbor => {
        return neighbor.links == 0
      })
      if (neighbors.length > 0) {
        stack.push(current)
        const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
        grid.link(row, column, neighbor.direction)
        stack.push(neighbor)
      }
    }
  }
}
