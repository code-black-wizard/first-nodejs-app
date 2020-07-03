const { body, validationResult } = require('express-validator')
const { Task } = require('../models')

module.exports = (app, db, handleErr) => {
  app.post('/create-task', [
    body('title').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
  ], (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        res.status(200).send('Your create task')
        db.collection('tasks').insertOne(req.body)
          .then(result => {
            const { ops } = result
            const { title, description, _id } = ops[0]
            const newTask = new Task(title, description, _id)
          })
      } else {
        handleErr(res, 400, 'Missing required fields')
      }
    } catch(err) {
      next(err)
    }
  })
}