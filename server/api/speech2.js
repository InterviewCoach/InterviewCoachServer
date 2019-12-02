const fs = require('fs')
const speech = require('@google-cloud/speech')
const toxicity = require('@tensorflow-models/toxicity')

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
    //grab data and put it in correct format for model
    const data = req.body.data
    const transcription = []
    data.forEach(string => {
      const array = string.split(' ')
      array.forEach(word => transcription.push(word))
    })

    //if there is no transcript, just return
    if (!transcription || !transcription.length) res.json([])
    else {
      //get toxicity labels
      const model = await toxicity.load(0.9)
      const predictions = await model.classify(transcription)

      // loop through all labels, filter out the ones that are a match
      const labels = predictions
        .filter(prediction => {
          return prediction.results[0].match || prediction.results[1].match
        })
        .map(prediction => prediction.label)

      // return labels of toxicity
      res.json(labels)
    }
  } catch (error) {
    res.status(500).send(error)
  }
})
