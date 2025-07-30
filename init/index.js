const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
 main()
 .then(()=>{
    console.log("connection successfully");
 }).catch((error)=>{
    console.log(error);
 })

 async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/PROJECT");
 }
 
 const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
 };
 initDB();