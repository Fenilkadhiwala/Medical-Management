//CREATE HTTP SERVER

const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const bodyparser = require("body-parser")
const path = require("path")
const connectDB = require("./server/database/connection");


const app = express()

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 3000

//LOG REQUEST
app.use(morgan('tiny'))

//MONGODB CONNECTION
connectDB()

//PARSE REQUEST TO BODY-PARSER
app.use(bodyparser.urlencoded({ extended: true }))

//SET VIEW ENGINE
app.set("view engine", "ejs")
// app.set("views",path.resolve(__dirname,"views"))


//LOAD ASSETS
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))

//LOAD ROUTERS

app.use('/', require('./server/routes/router'))


app.listen(PORT, () => {
    console.log(`Server Has Started At http://localhost:${PORT}`);
})