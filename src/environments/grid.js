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
    this._links.map((id) => Cell.get(id))
  }

  get neighbors() {
    let self = this
    let result = []
    ["north", "south", "east", "west"].forEach(function(direction) {
      if (self[direction]) {
        result.push(self[direction])
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
    let result = []
    for (let i = 0; i < this.width; i++) {
      result[i] = new Array(this.height)
      for (let j = 0; j < this.height; j++) {
        result[i][j] = new Cell(i, j)
      }
    }
    return result
  }

  configureCells() {
    let self = this
    this.cells.forEach(function(cell) {
      let {row, column} = cell
      cell.north = self.get(row - 1, column)
      cell.south = self.get(row + 1, column)
      cell.west = self.get(row, column - 1)
      cell.east = self.get(row, column + 1)
    })
  }
}
