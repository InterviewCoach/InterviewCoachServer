const Sequelize = require('sequelize')
const db = require('../db')
const {findFrequencies} = require('./functions')
const toxicity = require('@tensorflow-models/toxicity')

const Session = db.define('session', {
  // define your model here!
  questionCount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  likeWordCount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  actuallyWordCount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  basicallyWordCount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  totalWordCount: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }
  },
  audioFileURI: {
    type: Sequelize.STRING
    // type: Sequelize.varbinary(50), //the column data entries exceed 8,000 bytes.
  },
  content: {
    type: Sequelize.TEXT
  },
  audioString: {
    type: Sequelize.TEXT
  }
})

Session.afterCreate(async sessionInstance => {
  const transcript = sessionInstance.content
  const buzzwords = ['basically', 'actually', 'like']
  const counts = findFrequencies(transcript, buzzwords)
  await sessionInstance.update({
    basicallyWordCount: counts.basically,
    actuallyWordCount: counts.actually,
    likeWordCount: counts.like
  })
})

Session.afterCreate(async sessionInstance => {
  const transcript = sessionInstance.content
  const wordCount = transcript.split(' ').length
  await sessionInstance.update({
    totalWordCount: wordCount
  })
})

// Session.afterCreate(async sessionInstance => {
//   //grab data
//   const transcription = sessionInstance.content

//   //get toxicity labels
//   const model = await toxicity.load(0.9)
//   const predictions = await model.classify(transcription)

//   // loop through all labels, filter out the ones that are a match
//   const labels = predictions
//     .filter(prediction => {
//       let bool = false
//       prediction.results.forEach(result => (bool = bool || result.match))
//       if (bool) return prediction
//     })
//     .map(prediction => prediction.label)

//   // return labels of toxicity

// })

module.exports = Session
