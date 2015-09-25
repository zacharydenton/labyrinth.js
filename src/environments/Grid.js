const directions = ["north", "south", "east", "west"]

class Cell {
  constructor(row, column) {
    this.row = row
    this.column = column
    this.north = this.south = this.east = this.west = null
    this._links = new Set()
  }

  get links() {
    return [...this._links]
  }

  get neighbors() {
    const result = []
    directions.forEach(direction => {
      if (this[direction]) {
        result.push(this[direction])
      }
    })
    return result
  }

  link(cell, bidirectional=true) {
    this._links.add(cell)
    if (bidirectional) {
      cell.link(this, false)
    }
    return this
  }

  unlink(cell, bidirectional=true) {
    this._links.delete(cell)
    if (bidirectional) {
      cell.unlink(this, false)
    }
    return this
  }

  isLinked(cell) {
    return cell && this._links.has(cell)
  }
}

export default class Grid {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.generateGrid()
    this.configureCells()
  }

  get rows() {
    const result = []
    for (let i = 0; i < this.height; i++) {
      result.push(this.grid.slice(i * this.width, (i + 1) * this.width))
    }
    return result
  }

  get cells() {
    return this.grid
  }

  get length() {
    return this.width * this.height
  }

  randomCell() {
    return this.cells[Math.floor(Math.random() * this.length)]
  }

  get(row, column) {
    if (row < 0 || row >= this.height) {
      return null
    }
    if (column < 0 || column >= this.width) {
      return null
    }
    return this.grid[row * this.width + column]
  }

  generateGrid() {
    this.grid = []
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        this.grid.push(new Cell(row, column))
      }
    }
  }

  configureCells() {
    this.cells.forEach(cell => {
      const {row, column} = cell
      cell.north = this.get(row - 1, column)
      cell.south = this.get(row + 1, column)
      cell.west = this.get(row, column - 1)
      cell.east = this.get(row, column + 1)
    })
  }

  toString() {
    return this.rows.map((row, i) => {
      let result = ""

      if (i == 0) {
        result += "█"
        row.forEach(() => {
          result += "████"
        })
        result += "\n"
      }

      let top = "█"
      let bottom = "█"
      row.forEach((cell, j) => {
        top += "   "
        if (cell.isLinked(cell.east)) {
          top += " "
        } else {
          top += "█"
        }

        if (cell.isLinked(cell.south)) {
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
