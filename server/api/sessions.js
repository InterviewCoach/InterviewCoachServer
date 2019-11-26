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
        'uhmWordCount',
        'ahWordCount',
        'totalWordCount',
        'audioFileURI'
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
      uhmWordCount: req.body.uhmWordCount,
      ahWordCount: req.body.ahWordCount,
      totalWordCount: req.body.totalWordCount,
      audioFileURI: req.body.audioFileURI
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
