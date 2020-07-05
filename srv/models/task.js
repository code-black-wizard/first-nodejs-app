let tasks = []

module.exports = class Task {
  constructor(title, description, id, date) {
    this.title = title,
    this.description = description
    this.id = id
    this.date = date
  }

  static save (data) {
    tasks = data
  }

  static getAll () {
    return tasks
  }
}