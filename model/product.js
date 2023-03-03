const mongoose = require("mongoose")
const userModel = new mongoose.Schema({
    name: String,
    price: String,
    catagory: String,
})
const user =  mongoose.model("product",userModel);
module.exports = user ;