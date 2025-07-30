const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listingSchema = new Schema ({
    title : {
        type : String , 
        required : true ,
    },
    Image : {
        type : String ,
        default : "https://th.bing.com/th/id/OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8?rs=1&pid=ImgDetMain" , set : (v)=> v ===" " ? "https://th.bing.com/th/id/OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8?rs=1&pid=ImgDetMain" : v,
    },
    Price : Number ,
    category: String,
    Description : String ,
});
const Listing = mongoose.model("Listing" ,listingSchema);
module.exports  = Listing;