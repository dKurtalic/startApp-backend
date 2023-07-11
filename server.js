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

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true });
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})
app.all('*', (req, res) => {
    res.json({ "every thing": "is awesome" })
})
//?


