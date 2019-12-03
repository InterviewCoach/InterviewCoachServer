const User = require('./user')
const Session = require('./session')
const Question = require('./question')
const Toxicity = require('./toxicity')

Session.belongsTo(User)
// Session.hasOne(User)
User.hasMany(Session)
Session.hasMany(Toxicity)

// Question.belongsToMany(Session, { through: QuestionSession });
// Session.belongsToMany(Question, { through: QuestionSession });
// Session.hasMany(Question)
// Question.hasMany(Session)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Session,
  Question,
  Toxicity
}
