let tasks = []

module.exports = class Task {
  constructor(title, description, id) {
    this.title = title,
    this.description = description
    this.id = id
  }

  static save (data) {
    tasks = data
  }

  static getAll () {
    return tasks
  }
}