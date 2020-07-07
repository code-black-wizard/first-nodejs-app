const mongodb = require('mongodb')
const { body, param, validationResult } = require('express-validator')

module.exports = (app, db, handleErr) => {
  app.put('/task/:id', [
    body('description').not().isEmpty().trim(),
    param('id').not().isEmpty().trim()
  ], (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        db.collection('tasks').findOneAndUpdate({
          _id: mongodb.ObjectID(req.params.id)
        }, {
          $set: {
            description: req.body.description
          }
        })
          .then(() => {
            res.status(200).send('Your update task description')
          })
      } else {
        handleErr(res, 400, errors.errors.map(err => `${err.msg} ${err.param}`).join(''))
      }
    } catch (err) {
      next(err)
    }
  })
}