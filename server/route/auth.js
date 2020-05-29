const Joi = require('joi')
const jwt = require('jsonwebtoken')
//const _ = require(loadash)
const { Customer } = require('../model/customer')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()


router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await Customer.findOne({ username: req.body.username })
    if (user === null) return res.status(400).send('Invalid username or password...')

    const validPassword = bcrypt.compareSync(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid username or password...')

    const token = user.generateAuthToken();
    res.send({ token })

})

function validate(req) {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(7).max(1024).required()
    };

    return Joi.validate(req, schema);
}
module.exports = router