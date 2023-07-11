const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json());
app.use(cors())
app.use('/', routes);

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true }).then(() => {
    app.listen(PORT => {
        console.log("Connected to database and app successfully running on port 4000")
    })
}).catch((error) => {
    console.log(error)
})


