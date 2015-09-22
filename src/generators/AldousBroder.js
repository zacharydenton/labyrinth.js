export default class AldousBroder {
  static on(grid) {
    let cell = grid.randomCell
    for (let unvisited = grid.length - 1; unvisited > 0;) {
      const neighbors = cell.neighbors
      const neighbor = neighbors[Math.floor(Math.random() * neighbors.length)]
      if (neighbor.links.length == 0) {
        cell.link(neighbor)
        unvisited--
      }
      cell = neighbor
    }
  }
}
