var Restaurant = require("../models/restaurant");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkShowPageOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Restaurant.findById(req.params.id, function(err, foundRestaurant){
            if(err){
                req.flash("error", "Restaurant not found.");
                res.redirect("back");
            } else {
                // Does users own the show page
                // "foundRestaurant.author.id" is a mongoose object
                // "req.user._id" is a string
                if(foundRestaurant.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do this");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to do this");
        res.redirect("back");
    }
}

// middleware for check comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You don't have permission to do this");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "You must be logged in to do this");
        res.redirect("back");
    }
}

// add a middleware to check whether users logged in
// when users logged in, they can comment restaurant
// otherwise, redirect to login page
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = middlewareObj;