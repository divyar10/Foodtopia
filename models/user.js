var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username : String,
    password : String
});

/*var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, require: true},
    password: String,
    avatar: String,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, require: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});*/

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);