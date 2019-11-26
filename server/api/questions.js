const router = require('express').Router()
const {Question} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      // explicitly select only certain fields
      attributes: ['id', 'content']
    })
    res.json(questions)
  } catch (err) {
    next(err)
  }
})
