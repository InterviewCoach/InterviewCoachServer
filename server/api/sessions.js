const router = require('express').Router()
const {Session} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const sessions = await Session.findAll({
      // explicitly select only certain fields
      attributes: [
        'id',
        'date',
        'questionCount',
        'likeWordCount',
        'uhmWordCount',
        'ahWordCount',
        'totalWordCount',
        'audioFileURI'
      ]
    })
    res.json(sessions)
  } catch (err) {
    next(err)
  }
})
