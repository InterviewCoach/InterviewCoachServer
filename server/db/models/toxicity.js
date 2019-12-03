const Sequelize = require('sequelize')
const db = require('../db')

const Toxicity = db.define('toxicity', {
  // define your model here!
  label: {
    type: Sequelize.STRING
  }
})

module.exports = Toxicity
