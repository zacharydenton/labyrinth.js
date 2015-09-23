export default class Wilsons {
  static on(grid) {
    const unvisited = grid.cells
    const firstIndex = Math.floor(Math.random() * unvisited.length)
    unvisited.splice(firstIndex, 1)

    while (unvisited.length > 0) {
      let cell = unvisited[Math.floor(Math.random() * unvisited.length)]
      let path = [cell]

      while (unvisited.indexOf(cell) >= 0) {
        const neighbors = cell.neighbors
        cell = neighbors[Math.floor(Math.random() * neighbors.length)]
        const position = path.indexOf(cell)
        if (position >= 0) {
          path = path.slice(0, position + 1)
        } else {
          path.push(cell)
        }
      }

      for (let i = 0, l = path.length - 1; i < l; i++) {
        path[i].link(path[i + 1])
        unvisited.splice(unvisited.indexOf(path[i]), 1)
      }
    }
  }
}
