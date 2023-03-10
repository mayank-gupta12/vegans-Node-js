const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
const userModel = new mongoose.Schema({
    firstName: String,
    email: String,
    password: String,
    phone:String,
    lastname:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }]

})
userModel.plugin(plm,{usernameField: "email"})
const user =  mongoose.model("user",userModel);
module.exports = user ;