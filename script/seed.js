'use strict'

const db = require('../server/db')
const User = require('../server/db/models/user')
const Session = require('../server/db/models/session')
const Question = require('../server/db/models/question')

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
    date: '2019-11-14 13:01:28.22-05',
    questionCount: 10,
    likeWordCount: 10,
    uhmWordCount: 5,
    ahWordCount: 10,
    totalWordCount: 100,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 1
  },
  {
    date: '2019-11-15 13:01:28.22-05',
    questionCount: 11,
    likeWordCount: 2,
    uhmWordCount: 1,
    ahWordCount: 12,
    totalWordCount: 110,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 2
  },
  {
    date: '2019-11-16 13:01:28.22-05',
    questionCount: 12,
    likeWordCount: 3,
    uhmWordCount: 3,
    ahWordCount: 13,
    totalWordCount: 120,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 3
  },
  {
    date: '2019-11-17 13:01:28.22-05',
    questionCount: 13,
    likeWordCount: 10,
    uhmWordCount: 4,
    ahWordCount: 4,
    totalWordCount: 130,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 4
  },
  {
    date: '2019-11-18 13:01:28.22-05',
    questionCount: 14,
    likeWordCount: 7,
    uhmWordCount: 2,
    ahWordCount: 5,
    totalWordCount: 140,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 5
  },
  {
    date: '2019-11-19 13:01:28.22-05',
    questionCount: 15,
    likeWordCount: 1,
    uhmWordCount: 5,
    ahWordCount: 10,
    totalWordCount: 150,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 6
  },
  {
    date: '2019-11-20 13:01:28.22-05',
    questionCount: 14,
    likeWordCount: 2,
    uhmWordCount: 15,
    ahWordCount: 5,
    totalWordCount: 140,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 7
  },
  {
    date: '2019-11-21 13:01:28.22-05',
    questionCount: 13,
    likeWordCount: 3,
    uhmWordCount: 5,
    ahWordCount: 1,
    totalWordCount: 130,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 8
  },
  {
    date: '2019-11-22 13:01:28.22-05',
    questionCount: 12,
    likeWordCount: 5,
    uhmWordCount: 2,
    ahWordCount: 5,
    totalWordCount: 120,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 9
  },
  {
    date: '2019-11-23 13:01:28.22-05',
    questionCount: 11,
    likeWordCount: 5,
    uhmWordCount: 5,
    ahWordCount: 3,
    totalWordCount: 110,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 10
  },
  {
    date: '2019-11-24 13:01:28.22-05',
    questionCount: 10,
    likeWordCount: 5,
    uhmWordCount: 2,
    ahWordCount: 5,
    totalWordCount: 100,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 1
  },
  {
    date: '2019-11-25 13:01:28.22-05',
    questionCount: 5,
    likeWordCount: 5,
    uhmWordCount: 5,
    ahWordCount: 5,
    totalWordCount: 100,
    audioFileURI:
      'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FInterviewCoach-6d7ebd27-f831-43f9-b667-73bf8a9d7fde/Audio/recording-59b721d0-4966-43c9-b657-ced21177d5ae.m4a',
    userId: 1
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
  },
  {
    content: 'Tell me about a time you had to make a controversial decision.'
  },
  {
    content: 'Tell me about a time when you had to build or motivate a team.'
  },
  {
    content: 'Tell me about a situation when your work was criticized.'
  },
  {
    content: 'Tell me about a time when you influenced a team.'
  },
  {
    content: 'Tell me about a time when you had to make a tough decision.'
  },
  {
    content:
      'If I called up your teammates, how do you think they would describe you?'
  },
  {
    content: 'What was the toughest challenge you have ever faced?'
  },
  {
    content: 'Tell me about a time when you disagreed with someone.'
  },
  {
    content:
      'Tell me about a mistake you made. What happened, and what did you learn from it?'
  },
  {
    content:
      'Tell me about a time you had to use emotional intelligence to lead.'
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
  console.log('Seeding success!')
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error('Oh noes! Something went wrong!')
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
