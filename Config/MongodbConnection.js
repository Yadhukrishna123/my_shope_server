const mongoose = require("mongoose")

const dataBaseConnection = () => {
    mongoose.connect(process.env.database_connection)
    .then((data)=>console.log(`data base connected with ${data.connection.host}`)
    )
    .catch((err)=>console.log(err.message)
    )
}

module.exports = dataBaseConnection