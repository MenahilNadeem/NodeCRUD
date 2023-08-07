require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
//const Joi=require('joi');
const app = express();
const productroutes=require('./routes/productROutes');
const userroutes=require('./routes/userRouters');
const errorMiddleware = require('./middleware/errorMiddleware')

var cors = require('cors')
const port = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const mongoose = require('mongoose')
app.use(express.urlencoded({extended: false}))

//routes
app.use('/api/products',productroutes);

app.use('/api/users',userroutes);

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})



//JOI VALIDATION
// app.post('/api/courses',()=>{
//   const Schema ={
//     name:Joi.string().minLength(3).required()
//   };
// const result=Joi.validate(req.body,Schema)
// if(result.error)
// {
//   res.status(400).send(result.error)
//   return;
// }

// });
app.use(errorMiddleware);
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL).then(()=>{
console.log('connected');
app.listen(port, () => {
  console.log(`app listening on url http://localhost:${port}`);
});
}).catch(err => console.log(err));
