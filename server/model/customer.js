const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true
    },
    city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    state: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    zip: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 250
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 1024
    },
    age: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    }
    //isAdmin: Boolean
})


customerSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const Customer = mongoose.model('Customer', customerSchema)

function validateCustomer(customer) {
    const schema = {
        first_name: Joi.string().min(3).max(50).required(),
        last_name: Joi.string().min(3).max(50).required(),
        username: Joi.string().min(3).max(50).required(),
        city: Joi.string().min(3).max(50).required(),
        state: Joi.string().min(3).max(50).required(),
        zip: Joi.number().required(),
        email: Joi.string().required().min(5).max(250).email(),
        contact: Joi.number().required(),
        password: Joi.string().min(7).max(1024),
        age: Joi.number().required(),
        genre: Joi.array().default([])
    }
    return Joi.validate(customer, schema)
}

module.exports.Customer = Customer
module.exports.validate = validateCustomer