const mongoose = require('mongoose');
const mongoUrl =
  "mongodb+srv://tanmayshukla82:my_project@cluster0.gldmgpw.mongodb.net/Food-Cart?retryWrites=true&w=majority";
const db = async()=>{
    await mongoose.connect(mongoUrl,{useNewUrlParser: true}).then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log("Error in connection - ",err);
    })
}
module.exports = db;