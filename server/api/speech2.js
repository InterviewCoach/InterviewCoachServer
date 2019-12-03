const fs = require('fs')
const speech = require('@google-cloud/speech')
const toxicity = require('@tensorflow-models/toxicity')

const router = require('express').Router()
module.exports = router

// route gets transcription of audio file
router.get('/', async (req, res, next) => {
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
    console.log('Transcription: ', transcription)
    res.json(transcription)
    // res.send(file)
  } catch (error) {
    console.error('error: ', error)
    res.status(500).send(error)
  }
})

router.post('/toxicity', async (req, res, next) => {
  try {
    //if no data, return an empty object
    if (!req.body.data) res.json({})
    else {
      //grab data
      const transcription = req.body.data.concat([])

      //get toxicity labels
      const model = await toxicity.load(0.9)
      const predictions = await model.classify(transcription)

      // loop through all labels, filter out the ones that are a match
      const labels = predictions
        .filter(prediction => {
          let bool = false
          prediction.results.forEach(result => (bool = bool || result.match))
          if (bool) return prediction
        })
        .map(prediction => prediction.label)

      // return labels of toxicity
      res.json(labels)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})
