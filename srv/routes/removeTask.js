const mongodb = require('mongodb')
const { param, validationResult } = require('express-validator')

module.exports = (app, db, handleErr) => {
  app.delete('/task/:id', [
    param('id').not().isEmpty().trim()
  ], (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        db.collection('tasks').findOneAndDelete({
          _id: mongodb.ObjectID(req.params.id)
        })
          .then(result => {
            if (result.value) {
              res.status(200).send('Your remove task')
            } else {
              handleErr(res, 400, 'Task with such id not found')
            }
          })
      } else {
        handleErr(res, 400, 'Missing ID field')
      }
    } catch (err) {
      next(err)
    }
  })
}