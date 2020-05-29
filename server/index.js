const config = require('config');
const cors = require("cors")
//import mongoose
const mongoose = require('mongoose')

//import express
const express = require('express')
const app = express()
app.use(cors())

//import route middleware
const customer = require('./route/customers')
const auth = require('./route/auth')

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

//connect to MongoDB
mongoose.connect('mongodb://localhost/chalchitra', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

//using middlewares
app.use(express.json())
app.use('/api/customer/', customer)
app.use('/api/auth/', auth)


//start server
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))
