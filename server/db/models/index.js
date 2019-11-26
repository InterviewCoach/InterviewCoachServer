const User = require('./user')
const Session = require('./session')
const Question = require('./question')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsTo(Session)
Session.hasOne(User)
// User.hasMany(Session);

// Question.belongsToMany(Session, { through: QuestionSession });
// Session.belongsToMany(Question, { through: QuestionSession });
Session.hasMany(Question)
Question.hasMany(Session)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

module.exports = {
  User,
  Session,
  Question
}
