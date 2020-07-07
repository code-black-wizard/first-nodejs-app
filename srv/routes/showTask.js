const mongodb = require('mongodb')

module.exports = (app, db, handleErr) => {
  app.get('/task/:id', (req, res, next) => {
    try {
      db.collection('tasks').findOne({
        _id: mongodb.ObjectID(req.params.id)
      })
        .then(result => {
          if (result) {
            res.json(result)
          } else {
            handleErr(res, 400, 'Task with such id not found')
          }
        })
    } catch (err) {
      next(err)
    }
  })
}