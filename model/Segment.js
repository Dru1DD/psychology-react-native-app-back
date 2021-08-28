const { Schema, model } = require('mongoose')

const Segment = new Schema({
    catagory: {
        type: String,
        require: true
    },
    problem: {
        type: String,
        require: true
    },
    problem:{
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    }
})

module.exports = model('Segment', Segment)