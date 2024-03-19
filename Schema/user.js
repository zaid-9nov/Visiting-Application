const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose= require("passport-local-mongoose");


const userSchema = new Schema({
    email :{
        type : String,
        required: true
    }
    // username & password automatically created 
});

userSchema.plugin(passportLocalMongoose);   // This line automatically adds Username, hashing, salting, password to Schema

module.exports = mongoose.model("User", userSchema);