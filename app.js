const express = require("express");
const app = express();
const path = require("path")
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cors({
    credentials: true,
    origin: true
}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const sampleMiddleware = (req, res, next) => {
    console.log("Middleware");
    next()

}
app.use(sampleMiddleware) // Application level middleware

module.exports = app;