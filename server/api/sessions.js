const router = require('express').Router()
const {Session} = require('../db/models')
const fs = require('fs')
const speech = require('@google-cloud/speech')

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

router.get('/latest', async (req, res, next) => {
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

    const latestSession = sessions.slice(sessions.length - 1)
    res.json(latestSession)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/user/:userId', async (req, res, next) => {
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
      ],
      where: {
        userId: req.params.userId
      }
    })
    if (sessions.length) {
      res.status(200).json(sessions)
    } else {
      res.status(404).send('No user with that ID!')
    }
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

// router.post('/', async (req, res, next) => {
//   try {
//     const newSession = await Session.create({
//       date: req.body.date,
//       questionCount: req.body.questionCount,
//       likeWordCount: req.body.likeWordCount,
//       actuallyWordCount: req.body.actuallyWordCount,
//       basicallyWordCount: req.body.basicallyWordCount,
//       totalWordCount: req.body.totalWordCount,
//       audioFileURI: req.body.audioFileURI,
//       content: req.body.content,
//       userId: req.body.userId
//     })
//     res.json(newSession)
//   } catch (err) {
//     console.error(err)
//     next(err)
//   }
// })

router.post('/', async (req, res, next) => {
  try {
    // Creates a client for google
    const client = new speech.SpeechClient()
    const audio = {
      content: req.body.string
    }
    const config = {
      encoding: 'AMR',
      sampleRateHertz: 8000,
      languageCode: 'en-US'
    }
    const request = {
      audio: audio,
      config: config
    }
    // Detects speech in the audio file
    const [response] = await client.recognize(request)
    const transcription = response.results.map(
      result => result.alternatives[0].transcript
    )
    const newSession = await Session.create({
      audioFileURI: req.body.audioFileURI,
      // userId: req.params.id,
      content: transcription.join(' ')
    })
    res.json(transcription)
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
