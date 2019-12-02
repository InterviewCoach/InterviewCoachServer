const fs = require('fs')
const speech = require('@google-cloud/speech')
// const toxicity = require('@tensorflow-models/toxicity')

const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  res.send('nothing to see here --- make a post request!')
})

// route gets transcription of audio file
router.post('/', async (req, res, next) => {
  try {
    // Creates a client for google
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
    //get toxicity labels
    //const model = await toxicity.load(0.9)
    //const predictions = await model.classify(transcription)

    //loop through all labels, filter out the ones that are a match
//     const toxicity = predictions
//       .filter(prediction => {
//         return prediction.results[0].match
//       })
//       .map(prediction => prediction.label)

//     res.send({transcription, toxicity})
    res.json(transcription)
    // res.send(file)
  } catch (error) {
    res.status(500).send(error)
  }
})
