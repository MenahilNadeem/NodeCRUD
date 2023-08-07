require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productroutes=require('./routes/productROutes');
const errorMiddleware = require('./middleware/errorMiddleware')
var cors = require('cors')

const app = express()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

const FRONTEND = process.env.FRONTEND
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

  
var corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow sending cookies and other credentials
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use('/api/products', productroutes);

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.use(errorMiddleware);

mongoose.set("strictQuery", false)
mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, ()=> {
        console.log(`Node API app is running on port ${PORT}`)
    });
}).catch((error) => {
    console.log(error)
})