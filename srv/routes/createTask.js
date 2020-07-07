const { body, validationResult } = require('express-validator')

module.exports = (app, db, handleErr) => {
  app.post('/create-task', [
    body('title').not().isEmpty().trim(),
    body('description').not().isEmpty().trim(),
  ], (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        db.collection('tasks').insertOne({...req.body, date: new Date()})
          .then(() => {
            res.status(200).send('Your create task')
          })
          .catch(err => {
            next(err)
          })
      } else {
        handleErr(res, 400, 'Missing required fields')
      }
    } catch(err) {
      next(err)
    }
  })
}