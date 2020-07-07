const queryFiltersExist = require('../helpers/queryFiltersExist')

module.exports = (app, db) => {
  app.get('/tasks', async (req, res, next) => {
    const { page = 1, limit = 10, title = ''} = req.query
    try {
      const totalCount = await db.collection('tasks').countDocuments()
      const totalPages = Math.ceil(totalCount / +limit)
      const filters = [
        {
          title: title
        }
      ]
      const tasks = await db.collection('tasks').find({
        $or: queryFiltersExist(filters)
      }).skip((+page - 1) * +limit).limit(+limit).toArray()
      res.json({data: tasks, pagination: {
        page: +page,
        limit: +limit,
        totalCount,
        totalPages
      }})
    } catch (err) {
      next(err)
    }
  })
}