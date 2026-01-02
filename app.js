const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

main()
   .then(() => {
      console.log("connection successful");
   }).catch((error) => {
      console.log(error);
   })

async function main() {
   await mongoose.connect("mongodb://127.0.0.1:27017/PROJECT");
}

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);


app.get("/demo", (req, res) => {
   res.render("listings/demo.ejs");
})
//front page of our app
app.get("/",(req, res) => {
   res.render("pages/home.ejs");

})
//signup page
app.get("/signup", (req, res) => {
   res.render("pages/signup.ejs");
})
//login page
app.get("/login", (req, res) => {
   res.render("pages/login.ejs");
})
//home page of our app
app.get("/home-menu",wrapAsync (async (req, res ,next) => {
   const allItems = await Listing.find({});
   res.render("pages/home-menu.ejs", { allItems });
}));
//about our app
app.get("/home-menu/about", (req, res) => {
   res.render("pages/about.ejs");
})
//new route
app.get("/home-menu/new", (req, res) => {
   res.render("pages/new.ejs");
})

//show route - food details
app.get("/home-menu/:id",wrapAsync (async (req, res,next) => {
   let { id } = req.params;
   const Items = await Listing.findById(id);
   res.render("pages/food-details.ejs", { Items });
}));
//create route
app.post("/home-menu", async (req, res) => {
      const newItem = new Listing(req.body.listing);
      await newItem.save();
      res.redirect("pages/home-menu.ejs");
});

//edit route
app.get("/home-menu/:id/edit",wrapAsync( async (req, res) => {
   let {id} = req.params;
   const listing = await Listing.findById(id);
   let originalImageUrl = listing.Image;
   originalImageUrl=originalImageUrl.replace("/upload" ,"/upload/w_250");
   res.render("pages/edit.ejs" ,{listing , originalImageUrl});
}))
//update route
// app.put("/home-menu/:id" ,async(req ,res)=>{
//    let {id} = req .params;
//   await Listing.findByIdAndUpdate(id , {...req.body.listing});
//    res.redirect(`listings/${id}`);
// })


app.listen(8080, () => {
   console.log("server start");
})