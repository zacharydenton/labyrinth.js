export default class RecursiveBacktracker {
  static on(grid) {
    const stack = []
    stack.push(grid.randomCell())
    while (stack.length > 0) {
      const current = stack.pop()
      const neighbors = current.neighbors.filter(neighbor => {
        return neighbor.links.length == 0
      })
      if (neighbors.length > 0) {
        stack.push(current)
        const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
        current.link(neighbor)
        stack.push(neighbor)
      }
    }
  }
}
