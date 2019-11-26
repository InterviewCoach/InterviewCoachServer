const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only certain fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'firstName', 'lastName', 'fullName', 'email']
    })
    res.json(users)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'fullName', 'email'],
      where: {
        id: req.params.id
      }
    })
    if (singleUser.length) {
      res.status(200).json(singleUser)
    } else {
      res.status(404).send('No user with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    res.json(newUser)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deleteUser.length) {
      res.status(200).json(deleteUser)
    } else {
      res.status(404).send('No user with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updateUser = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    if (updateUser.length) {
      res.status(201).json(updateUser[1][0])
    } else {
      res.status(404).send('No user with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})
