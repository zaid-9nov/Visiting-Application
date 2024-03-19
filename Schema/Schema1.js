const mongoose = require("mongoose");
const Review= require("./review.js")
const {Schema} = mongoose;

const schemaList = new mongoose.Schema ({
    title: String,
    description : String,
    image: {
        filename: String,
        url : String
    },
    price : Number,
    location : String,
    country: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
});

schemaList.post("findOneAndDelete", async(listing)=>{
    if(listing)
    {
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});


const Listing = mongoose.model("Listing", schemaList);
module.exports = Listing;

