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
        'actuallyWordCount',
        'basicallyWordCount',
        'totalWordCount',
        'audioFileURI',
        'content',
        'userId'
      ]
    })
    res.json(sessions)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleSession = await Session.findAll({
      attributes: [
        'id',
        'date',
        'questionCount',
        'likeWordCount',
        'actuallyWordCount',
        'basicallyWordCount',
        'totalWordCount',
        'audioFileURI',
        'content',
        'userId'
      ],
      where: {
        id: req.params.id
      }
    })
    if (singleSession.length) {
      res.status(200).json(singleSession)
    } else {
      res.status(404).send('No session with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newSession = await Session.create({
      date: req.body.date,
      questionCount: req.body.questionCount,
      likeWordCount: req.body.likeWordCount,
      actuallyWordCount: req.body.actuallyWordCount,
      basicallyWordCount: req.body.basicallyWordCount,
      totalWordCount: req.body.totalWordCount,
      audioFileURI: req.body.audioFileURI,
      content: req.body.content,
      userId: req.body.userId
    })
    res.json(newSession)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteSession = await Session.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deleteSession.length) {
      res.status(200).json(deleteSession)
    } else {
      res.status(404).send('No session with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})
