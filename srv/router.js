const createTask = require('./routes/createTask')
const getTasks = require('./routes/getTasks')
const removeTask = require('./routes/removeTask')
const showTask = require('./routes/showTask')
const updateTask = require('./routes/updateTask')

module.exports = {
  createTask,
  getTasks,
  removeTask,
  showTask,
  updateTask
}