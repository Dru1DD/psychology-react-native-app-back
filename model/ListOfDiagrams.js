const { Schema, model } = require('mongoose')

// Схема сегмента
const Segment = new Schema({
    catagory: {
        type: String,
        require: true
    },
    problem: {
        type: String,
        require: true
    },
    emotion:{
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    }
})

// Схема Диаграмы
const Diagrama = new Schema ({
    countOfParts: Number,
    mainSegment: {
        color: String,
        problem: String
    },
    anotherSegments: [Segment]
})

//Список всех диаграмм
const ListOfDiagrams = new Schema({
    email: String,
    diagrams: [Diagrama]
})


module.exports = model('ListOfDiagrams', ListOfDiagrams)