const mongoose = require('mongoose');
const mongoUrl = process.env.MONGO;
const db = async()=>{
    await mongoose.connect(mongoUrl,{useNewUrlParser: true}).then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log("Error in connection - ",err);
    })
}
module.exports = db;