var mongoose = require("mongoose");
var Restaurant = require("./models/restaurant");
var Comment = require("./models/comment");

var data = [
    {
        restaurantName: "Just Cafetaria", 
        restaurantImage: "http://nsitpedia.collegespace.in/wp-content/uploads/2014/04/Just-Cafe.jpg",
        description: "Just Cafeteria, a relatively canteen in the NSIT campus is located just opposite McCain , near the boys’ hostels. The food is tasty and affordable at the same time. The popular items in the menu include the Stuffed Parathas, Vada Pav , Pasta and Chowmein. Being close to the boys’ hostels, Just Cafeteria is frequented by hostelers looking to spare themselves the horrors of the mess food. ",
        price: "50",
        address: "NSUT Campus",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Muskan"
        }
    },
    {
        restaurantName: "Mini Zayca", 
        restaurantImage: "http://nsitpedia.collegespace.in/wp-content/uploads/2014/04/Mini-Zayca.jpg",
        description: "Mini Zayca was a cafe established in 2012 by Sunder Singh Rawat after Nescafe bid adieu to NSIT. It is situated to the left of the admin block (if you’re facing it!) and right across the road dwells Khan Fruit Chaat Waala (he’s revered for his wisdom) and the Nescii Mini Zaycalawns. If you’re looking for a small bite, this is definitely the place to be. It sells everything from samosas, patties & chips to slightly bigger treats like spring rolls, maggi, fries, chilli potatoes, noodles, pastries & chicken rolls.",
        price: "40",
        address: "NSUT Campus",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Divya"
        }
    },
    {
        restaurantName: "Mc Cain", 
        restaurantImage: "http://www.nsit.ac.in/static/images/canteens/2.jpg",
        description: "McCain, the canteen located in the forested area opposite BH2 and BH3 probably has the best food in all of NSIT and this can be gauged from the fact that it is the most frequented canteen in the college. It started by selling McCain’s frozen products like French Fries, Smiles, Hash Browns etc and hence the name. But now it has diversified into selling all the usual canteen stuff. Samosas, Patties, Dosa, Chowmein, Burger, Pav Bhaji , Cholley Bhature and Sandwiches ",
        price: "50",
        address: "NSUT Campus",
        author:{
            id : "588c2e092403d111454fff76",
            username: "divyar10"
        }
    },
    {
        restaurantName: "Student Centre Cafetaria", 
        restaurantImage: "https://scontent.fdel1-4.fna.fbcdn.net/v/t1.0-9/46087004_1880362758698606_195780328931983360_n.jpg?_nc_cat=108&_nc_ht=scontent.fdel1-4.fna&oh=c505097b9491f69216a6fc646f7c2560&oe=5D371D5B",
        description: "This is the newest canteen of NSUT that started operations on 12th Nov 2018 and the wait for a fully air conditioned canteen was finally over. The quality of food being served here is fairly decent. ",
        price: "40",
        address: "NSUT Campus",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Divya"
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
                            text: "This place serves ideal food at a very reasonable price. ",
                            author: {
                                id: "588c2e092403d111454fff76",
                                username: "Muskan"
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