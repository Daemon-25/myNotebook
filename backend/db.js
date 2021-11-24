const mongoose = require('mongoose')

//URL for connection to mongoDB
const mongoURI = 'mongodb://localhost:27017/myNotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

//Function to connect to mongoDB
 const connectToMongo = async () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo Successfully")
    })
 }

 module.exports = connectToMongo;
