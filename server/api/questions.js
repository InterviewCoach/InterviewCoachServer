const router = require('express').Router()
const {Question} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const questions = await Question.findAll({
      // explicitly select only certain fields
      attributes: ['id', 'content']
    })
    res.json(questions)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleQuestion = await Question.findAll({
      attributes: ['id', 'content'],
      where: {
        id: req.params.id
      }
    })
    if (singleQuestion.length) {
      res.status(200).json(singleQuestion)
    } else {
      res.status(404).send('No question with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newQuestion = await Question.create({
      content: req.body.content
    })
    res.json(newQuestion)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteQuestion = await Question.destroy({
      where: {
        id: req.params.id
      }
    })
    if (deleteQuestion.length) {
      res.status(200).json(deleteQuestion)
    } else {
      res.status(404).send('No question with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updateQuestion = await Question.update(
      {
        content: req.body.content
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
    if (updateQuestion.length) {
      res.status(201).json(updateQuestion[1][0])
    } else {
      res.status(404).send('No question with that ID!')
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})
