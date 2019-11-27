const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/sessions', require('./sessions'))
router.use('/questions', require('./questions'))
router.use('/speech', require('./speech'))
router.use('/speech2', require('./speech2'))


router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
