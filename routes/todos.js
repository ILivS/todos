const express = require('express')
const router = new express.Router()
const Todos = require('../models/todos')

router.post('/', async (req, res) => {
    try {
        const todoItem = new Todos(req.body)
        const data = await todoItem.save()
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({e})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        const data = await Todos.findOne({_id})
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: 'Could not find that Todo item!'
        })
    }
})

router.post('/:id', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        const title = req.body.title ? req.body.title : ''
        const data = await Todos.findOneAndUpdate(
            {_id},
            {$set: {title}},
            {new: true}
        )
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({success: false, message: 'Update failed!'})
    }
})

router.post('/:id/toggle', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        const todoItem = await Todos.findOne({_id})
        const completed = todoItem.completed
        const data = await Todos.findOneAndUpdate(
            {_id},
            {$set: {completed: !completed}},
            {new: true}
        )
        res.status(200).send({success: true, data})
    } catch (e) {
        res.status(400).send({
            success: false,
            message: 'Could not toggle!'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const _id = req.params.id ? req.params.id : ''
        const data = await Todos.findOneAndDelete({_id})
        res.status(200).send({success: true, data: true})
    } catch (e) {
        res.status(400).send({
            success: false,
            data: false
        })
    }
})

module.exports = router
