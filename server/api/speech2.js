// const Hapi = require('@hapi/hapi')
const fs = require('fs')
const speech = require('@google-cloud/speech')
// const ffmpeg = require('fluent-ffmpeg')

const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  res.send('hello nothing to see - make a post request!')
})

router.post('/', async (req, res, next) => {
  try {
    console.log('hello!')
    // Creates a client for google
    const client = new speech.SpeechClient()

    //req.body should be in base64 for google to accept
    const audio = {
      content: req.body
    }

    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'en-US'
    }

    const request = {
      audio: audio,
      config: config
    }

    // Detects speech in the audio file
    const [response] = await client.recognize(request)
    console.log(`response: ${response}`)
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
    console.log(`Transcription: ${transcription}`)

    res.send(transcription)
    // res.send(file)
  } catch (error) {
    res.send(error)
  }
})
