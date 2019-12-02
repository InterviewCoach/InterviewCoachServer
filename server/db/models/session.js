const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('session', {
  // define your model here!
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
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
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Session
