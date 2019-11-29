// const Hapi = require('@hapi/hapi')
const fs = require('fs')
const speech = require('@google-cloud/speech')

const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  res.send('hello nothing to see - make a post request!')
})

// route gets transcription of audio file
router.post('/', async (req, res, next) => {
  try {
    const client = new speech.SpeechClient()

    const audio = {
      content: req.body
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
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')

    res.send(transcription)
  } catch (error) {
    res.status(500).send(error)
  }
})
