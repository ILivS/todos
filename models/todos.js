const mongoose = require('mongoose')
//require('dotenv').config()

const todosSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        completed: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        }
    },
    {versionKey: false}
)

const Todos = mongoose.model('todos', todosSchema)

module.exports = Todos
