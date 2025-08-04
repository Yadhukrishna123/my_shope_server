const mongoose = require("mongoose")


const addressScheme = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city_district_town: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    landMark: {
        type: String,
        required: true,
    }
})

module.exports =addressScheme