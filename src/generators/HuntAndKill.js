export default class HuntAndKill {
  static on(grid) {
    let current = grid.randomCell()
    while (current) {
      const unvisitedNeighbors = current.neighbors.filter(neighbor => {
        return neighbor.links.length == 0
      })
      if (unvisitedNeighbors.length > 0) {
        const neighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)]
        current.link(neighbor)
        current = neighbor
      } else {
        current = null
        for (let cell of grid.cells) {
          const visitedNeighbors = cell.neighbors.filter(neighbor => {
            return neighbor.links.length > 0
          })
          if (cell.links.length == 0 && visitedNeighbors.length > 0) {
            current = cell
            const neighbor = visitedNeighbors[Math.floor(Math.random() * visitedNeighbors.length)]
            current.link(neighbor)
            break
          }
        }
      }
    }
  }
}
