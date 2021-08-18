const express = require('express')
const mongoose = require('mongoose')

const indexRoute = require('./routes/index')

const PORT = process.env.PORT || 3000

const app = express() 

app.use(express.json())

app.use('/', indexRoute)
// mongodb+srv://Dru1DD:v55PkyKqOXjir274@cluster0.bwimu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const start = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on PORT ${PORT}...`)
        })

    } catch(e) {
        console.log(e)
    }
}

start()