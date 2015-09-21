export default class Sidewinder {
  static on(grid) {
    grid.rows.forEach(row => {
      let run = []
      row.forEach(cell => {
        run.push(cell)
        const atEasternBoundary = !cell.east
        const atNorthernBoundary = !cell.north
        const shouldCloseOut = atEasternBoundary ||
          (!atNorthernBoundary && Math.random() < 0.5)
        if (shouldCloseOut) {
          const member = run[Math.floor(Math.random() * run.length)]
          if (member.north) {
            member.link(member.north)
          }
          run = []
        } else {
          cell.link(cell.east)
        }
      })
    })
  }
}
