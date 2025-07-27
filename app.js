const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapasync.js");

main()
    .then(() => {
        console.log("connected to MongoDB")
    })
    .catch((err) => {
        console.log(err)
    });

async function main(){  
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "/public")))

// HOME route

app.get("/", (req, res) => {
    res.render("listings/home.ejs")
})


// INDEX route

app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings})

})

// NEW route

 app.get("/listings/new", (req, res) => {
    res.render('listings/new.ejs')
 })

// SHOW route

app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show.ejs", {listing})
 })


 // Create route

 app.post("/listings", wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings")
 }))

// EDIT route

app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs", {listing})
})


// UPDATE route

app.put("/listings/:id", async(req, res) => {
    let { id } = req.params;
    console.log("PUT request received");
    console.log("body", req.body)
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`)
})

// DELETE route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deleteList = await Listing.findByIdAndDelete(id);
    console.log(deleteList)
    res.redirect("/listings")
})

app.use((err, req, res, next) => {
    res.send("Something went wrong!")
})

app.listen(8080, () => {
    console.log("Server is listening to port 8080")
})