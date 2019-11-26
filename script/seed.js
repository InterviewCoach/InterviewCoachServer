'use strict'

const db = require('../server/db')
const {green, red} = require('chalk')
const {User} = require('../server/db/models/user')
const {Session} = require('../server/db/models/session')
const {Question} = require('../server/db/models/question')

const users = [
  {
    firstName: 'Blair',
    lastName: 'Waldorf',
    email: 'Blair.Waldorf@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Serena',
    lastName: 'van der Woodsen',
    email: 'Serena.vanderWoodsen@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Dan',
    lastName: 'Humphrey',
    email: 'Dan.Humphrey@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Nate',
    lastName: 'Archibald',
    email: 'Nate.Archibald@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Chuck',
    lastName: 'Bass',
    email: 'Chuck.Bass@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Vanessa',
    lastName: 'Abrams',
    email: 'Vanessa.Abrams@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Ivy',
    lastName: 'Dickens',
    email: 'Ivy.Dickens@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Jenny',
    lastName: 'Humphrey',
    email: 'Jenny.Humphrey@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Georgina',
    lastName: 'Sparks',
    email: 'Georgina.Sparks@IAJS.com',
    password: '123456'
  },
  {
    firstName: 'Juliet',
    lastName: 'Sharp',
    email: 'Juliet.Sharp@IAJS.com',
    password: '123456'
  }
]

const sessions = [
  {
    date: 2019 - 11 - 25,
    questionCount: 10,
    likeWordCount: 1,
    uhmWordCount: 1,
    ahWordCount: 1,
    totalWordCount: 100,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a'
  },
  {
    date: 2019 - 11 - 26,
    questionCount: 20,
    likeWordCount: 2,
    uhmWordCount: 2,
    ahWordCount: 2,
    totalWordCount: 200,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a'
  },
  {
    date: 2019 - 11 - 27,
    questionCount: 30,
    likeWordCount: 3,
    uhmWordCount: 3,
    ahWordCount: 3,
    totalWordCount: 300,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a'
  },
  {
    date: 2019 - 11 - 27,
    questionCount: 40,
    likeWordCount: 4,
    uhmWordCount: 4,
    ahWordCount: 4,
    totalWordCount: 400,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a'
  },
  {
    date: 2019 - 11 - 28,
    questionCount: 50,
    likeWordCount: 5,
    uhmWordCount: 5,
    ahWordCount: 5,
    totalWordCount: 500,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a'
  }
]

const questions = [
  {
    content: 'What is something you have accomplished that you are proud of?'
  },
  {
    content: 'How do you work in a team?'
  },
  {
    content: 'Why should we hire you?'
  },
  {
    content: 'What is something interesting about you everyone should know?'
  },
  {
    content: 'If you could be any animal which would you be?'
  }
]

// seed your database here!

const seed = async () => {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  await Promise.all(
    sessions.map(session => {
      return Session.create(session)
    })
  )

  await Promise.all(
    questions.map(question => {
      return Question.create(question)
    })
  )
  console.log(green('Seeding success!'))
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
