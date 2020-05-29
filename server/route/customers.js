const config = require('config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
//const _ = require('loadash')
const auth = require('../middleware/auth')
const { Customer, validate } = require('../model/customer')
const express = require('express')
const router = express.Router()

router.get('/me', auth, async (req, res) => {
    const customer = await Customer.findById(req.user._id).select('-password')
    res.send(customer)
})

router.post('/', async (req, res) => {
    //console.log(req)
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let customer = await Customer.findOne({ username: req.body.username })
    if (customer) return res.status(400).send('Username already exist...')

    customer = await Customer.findOne({ email: req.body.email })
    if (customer) return res.status(400).send('User already registered with this email...')

    customer = new Customer({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        contact: req.body.contact,
        password: req.body.password,
        age: req.body.age,
        genre: req.body.genre
    })

    const salt = await bcrypt.genSaltSync(10);
    customer.password = bcrypt.hashSync(customer.password, salt);
    await customer.save()

    const token = customer.generateAuthToken()
    res.header('x-auth-token', token).send(customer)

})

module.exports = router;