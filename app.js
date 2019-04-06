var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var moment = require("moment");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var Restaurant = require("./models/restaurant");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./seeds");
// requiring routes
var commentRoutes = require("./routes/comments");
var restaurantRoutes = require("./routes/restaurants");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/RedPoint");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seed the database
//seedDB();

// passport figuration
app.use(require("express-session")({
    secret: "Divya-Muskan",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// if user logged in then return username
// otherwise, return  undefined
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

seedDB();

app.use("/restaurants", restaurantRoutes);
app.use("/restaurants/:id/comments", commentRoutes);
// have common routes "/restaurants;
app.use("/",indexRoutes);

app.listen("3000", function(){
    console.log("The FoodTopia server has started!");
});