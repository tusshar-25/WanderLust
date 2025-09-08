const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js")
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage})

// INDEX route && CREATE route
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn,  upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

// NEW route
router.route("/new")
    .get(isLoggedIn, listingController.newListing);

// SEARCH route
router.route("/search")
    .get(wrapAsync(listingController.searchListings))

// SHOW route && UPDATE route && DELETE route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// EDIT route
router.route("/:id/edit")
    .get(isLoggedIn, isOwner, wrapAsync(listingController.editListing));


module.exports = router;