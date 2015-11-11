const [NORTH, EAST, SOUTH, WEST] = [1, 2, 4, 8]
const DIRECTIONS = [NORTH, EAST, SOUTH, WEST]
const DELTAS = [[-1, 0], [0, -1], [1, 0], [0, 1]]

class Cell {
  constructor(grid, row, column) {
    this.grid = grid
    this.row = row
    this.column = column
  }

  get links() {
    return this.grid.links(this.row, this.column)
  }

  get north() {
    const cell = this.grid.get(this.row - 1, this.column)
    if (cell) {
      cell.direction = NORTH
    }
    return cell
  }

  get east() {
    const cell = this.grid.get(this.row, this.column - 1)
    if (cell) {
      cell.direction = EAST
    }
    return cell
  }

  get south() {
    const cell = this.grid.get(this.row + 1, this.column)
    if (cell) {
      cell.direction = SOUTH
    }
    return cell
  }

  get west() {
    const cell = this.grid.get(this.row, this.column + 1)
    if (cell) {
      cell.direction = WEST
    }
    return cell
  }

  get neighbors() {
    const result = []
    for (let [dRow, dColumn] of DELTAS) {
      const cell = this.grid.get(this.row + dRow, this.column + dColumn)
      if (cell) {
        result.push(cell)
      }
    }
    return result
  }
}

export default class Grid {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.generateGrid()
  }

  get rows() {
    const result = []
    for (let row = 0; row < this.height; row++) {
      result.push(
        this.grid.slice(row * this.width, (row + 1) * this.width)
        .map((_, column) => this.get(row, column))
      )
    }
    return result
  }

  get cells() {
    const result = []
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        result.push(this.get(row, column))
      }
    }
    return result
  }

  get size() {
    return this.width * this.height
  }

  inGrid(row, column) {
    return !((row < 0 || row >= this.height) ||
             (column < 0 || column >= this.width))
  }

  get(row, column) {
    if (!this.inGrid(row, column)) {
      return null
    }
    return new Cell(this, row, column)
  }

  links(row, column) {
    const cell = this.grid[row * this.width + column]
    return DIRECTIONS.filter(direction => {
      return (cell & direction) !== 0
    }).length
  }

  randomCell() {
    const row = Math.floor(Math.random() * this.height)
    const column = Math.floor(Math.random() * this.width)
    return this.get(row, column)
  }

  neighbors(row, column) {
    const result = []
    const cell = this.get(row, column)
    for (let i = 0, l = DELTAS.length; i < l; i++) {
      const [dRow, dColumn] = DELTAS[i]
      const neighbor = this.get(row + dRow, column + dColumn)
      if (neighbor) {
        neighbor.direction = DIRECTIONS[i]
        result.push(neighbor)
      }
    }
    return result
  }

  generateGrid() {
    this.grid = new Uint8Array(this.size)
    for (let i = 0, l = this.size; i < l; i++) {
      this.grid[i] = 0
    }
  }

  link(row, column, direction, bidirectional=true) {
    if (!this.inGrid(row, column)) {
      return
    }
    const index = row * this.width + column
    this.grid[index] |= direction
    if (bidirectional) {
      const directionIndex = DIRECTIONS.indexOf(direction)
      const [dRow, dColumn] = DELTAS[directionIndex]
      const otherDirection = DIRECTIONS[(directionIndex + 2) % DIRECTIONS.length]
      this.link(row + dRow, column + dColumn, otherDirection, false)
    }
  }

  toString() {
    return this.rows.map((row, i) => {
      let result = ""

      if (i === 0) {
        result += "█"
        row.forEach(() => {
          result += "████"
        })
        result += "\n"
      }

      let top = "█"
      let bottom = "█"
      row.forEach((cell, j) => {
        const links = this.grid[i * this.width + j]
        top += "   "
        if ((links & EAST) !== 0) {
          top += " "
        } else {
          top += "█"
        }

        if ((links & SOUTH) !== 0) {
          bottom += "   "
        } else {
          bottom += "███"
        }
        bottom += "█"
      })

      result += [top, bottom].join("\n")
      return result
    }).join("\n")
  }
}
