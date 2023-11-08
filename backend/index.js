const express = require('express')
const port = 4000;
const app = express();
const db = require('./db');
const { env } = require('process');
db();
env.config();
app.get('/',(req,res)=>{
    res.send('Hello Node');
})
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use('/api',require('./routers/createUser'));
app.use('/api',require('./routers/getFoodItem'));
app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})
