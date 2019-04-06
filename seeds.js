var mongoose = require("mongoose");
var Restaurant = require("./models/restaurant");
var Comment = require("./models/comment");

var data = [
    {
        restaurantName: "Just Cafetaria", 
        restaurantImage: "https://images.unsplash.com/photo-1515215316771-2742baa337f4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        description: "The most amazing canteen in NSUT campus by far. The food is tasty and affordable at the same time. The menu is eclectic and a pleasure to skim through. Chilli potato from JC a must try.",
        price: "50",
        address: "NSUT Campus",
        author:{
            id : "588c2e092403d111454fff76",
            username: "divyar10"
        }
    },
    {
        restaurantName: "Mini Zayca", 
        restaurantImage: "https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",
        description: "Mini Zayca was a cafe established in 2012 by Sunder Singh Rawat after Nescafe bid adieu to NSIT. It is situated to the left of the admin block (if you’re facing it!) and right across the road dwells Khan Fruit Chaat Waala (he’s revered for his wisdom) and the Nescii Mini Zaycalawns.",
        price: "40",
        address: "NSUT Campus",
        author:{
            id : "588c2e092403d111454fff76",
            username: "divyar10"
        }
    }
];

function seedDB() {
    // Remove all restaurants
    Restaurant.remove({}, function(err){
        if(err){
            console.log("Error: " + err);
        }
        console.log("Removed restaurants.");
        // add a few restaurants
        data.forEach(function(seed){
            Restaurant.create(seed, function(err, restaurant){
                if(err){
                    console.log(err);
                }else{
                    console.log("add a restaurant");
                    // create a comment
                    Comment.create(
                        {
                            text: "This place serves just the ideal food at the most reasonable price ever",
                            author: {
                                id: "588c2e092403d111454fff76",
                                username: "divyar10"
                            }
                        }, function(err, comment){
                            if(err){
                                console.log("Error: " + err);
                            }else{
                                restaurant.comments.push(comment._id);
                                restaurant.save();
                                console.log("Created new comment.");
                            }
                        });
                }
            });
        });
    });
    // add a few comments
}

module.exports = seedDB;