class Cell {
  static get nextId() {
    this._id = this._id || 0
    return this._id++
  }

  static get(id) {
    this._cells = this._cells || {}
    return this._cells[id]
  }

  static set(id, cell) {
    this._cells = this._cells || {}
    this._cells[id] = cell
  }

  constructor(row, column) {
    this.row = row
    this.column = column
    this.id = Cell.nextId
    this.north = this.south = this.east = this.west = null
    this._links = {}
  }

  get links() {
    this._links.map(id => Cell.get(id))
  }

  get neighbors() {
    const result = []
    ["north", "south", "east", "west"].forEach(direction => {
      if (this[direction]) {
        result.push(this[direction])
      }
    })
    return result
  }

  link(cell, bidirectional=true) {
    this._links[cell.id] = true
    if (bidirectional) {
      cell.link(this, false)
    }
    return this
  }

  unlink(cell, bidirectional=true) {
    delete this._links[cell.id]
    if (bidirectional) {
      cell.unlink(this, false)
    }
    return this
  }

  isLinked(cell) {
    !!this._links[cell.id]
  }
}

export default class Grid {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.grid = this.generateGrid()
    this.configureCells()
  }

  get rows() {
    return this.grid
  }

  get cells() {
    return this.rows.reduce((a, b) => a.concat(b))
  }

  get(row, column) {
    if (row < 0 || row >= this.height) {
      return null
    }
    if (column < 0 || column >= this.width) {
      return null
    }
    return this.grid[row][column]
  }

  generateGrid() {
    const result = new Array(this.height)
    for (let row = 0; row < this.height; row++) {
      result[row] = new Array(this.width)
      for (let column = 0; column < this.width; column++) {
        result[row][column] = new Cell(row, column)
      }
    }
    return result
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
        result += "┌"
      } else if (i == this.height - 1) {
        result += "└"
      } else {
        result += "├"
      }

      row.forEach((cell, j) => {
        if (i == 0) {
          result += "─┬"
        } else if (i == this.height - 1) {
          result += "─┴"
        } else {
          result += "─┼"
        }

        if (j == this.width - 1) {
          result += "─"
        }
      })

      if (i == 0) {
        result += "┐"
      } else if (i == this.height - 1) {
        result += "┘"
      } else {
        result += "┤"
      }

      return result
    }).join("\n")
  }
}
