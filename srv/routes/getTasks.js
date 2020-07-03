const { Task } = require('../models')

module.exports = (app, db) => {
  app.get('/get-tasks', (req, res, next) => {
    try {
      db.collection('tasks').find().toArray()
        .then(result => {
          const tasks = Task.save(result)
          res.json(Task.getAll())
        })
    } catch (err) {
      next(err)
    }
  })
}