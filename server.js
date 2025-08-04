const dotenv = require("dotenv")
const app = require("./app")
const userRouter = require("./Routes/UserRoutes")
const dataBaseConnection = require("./Config/MongodbConnection")

app.use("/api/v1", userRouter)

dotenv.config({path:"./Config/Config.env"})
dataBaseConnection()
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);

})