const User = require("../models/user.js");

// SIGNUP route
module.exports.signup = async (req, res) => {
    res.render("users/signup.ejs")
}

// SIGNUP POST route
module.exports.signupPost = async(req, res) => {
    try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username})
    const registeredUser = await User.register(newUser, password)
    console.log(registeredUser)

    req.login(registeredUser, (err) => {
        if(err){
            req.flash("error", "You are not logged in!")
            return res.redirect("/login")
        }
        req.flash("success", "Welcome to Wanderlust")
        res.redirect("/")
    })
    }catch(e){
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}


// LOGIN route 
module.exports.login = (req, res) => {
    res.render("users/login.ejs")
};

// LOGIN POST route
module.exports.loginPost = async (req, res) => {
    req.flash("success", "Welcome back!");
    const redirectUrl = res.locals.redirectUrl || "/";
    delete req.session.redirectUrl; // 👈 optional, taaki ek hi baar chale
    res.redirect(redirectUrl);
}

// LOGOUT route
module.exports.logout = (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "Goodbye!")
        res.redirect("/");
    });
}