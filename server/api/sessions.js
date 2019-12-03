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
        'createdAt',
        'id',
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

router.get('/user/:id', async (req, res, next) => {
  try {
    const singleSession = await Session.findAll({
      attributes: [
        'id',
        'createdAt',
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
        userId: req.params.id
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
      userId: req.body.userId,
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
