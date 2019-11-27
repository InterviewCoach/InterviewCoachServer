// const Hapi = require('@hapi/hapi')
const fs = require('fs')
const speech = require('@google-cloud/speech')
// const ffmpeg = require('fluent-ffmpeg')

const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const data = req.body

    // Creates a client
    const client = new speech.SpeechClient()

    const file = fs.readlinkSync(data.uri1)

    const audioBytes = file.toString('base64')

    const audio = {
      content: audioBytes
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
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n')
    console.log(`Transcription: ${transcription}`)
    res.send(transcription)
  } catch (error) {
    console.log(error)
  }
})
