const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
   
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city_district_town: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landMark: {
        type: String,
        required: true
    }
});
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    addresses: [addressSchema]
});

module.exports = mongoose.model("users", userSchema);
