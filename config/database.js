const mongoose = require("mongoose");

require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL ,{})
    .then(() => {console.log("Db Connected Sucessfully")})
    .catch((error)=>{
        console.log("Error in db Connection");
        console.error(error);
        process.emit(1);
    })
}