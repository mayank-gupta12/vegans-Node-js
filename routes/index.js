var express = require('express');
var router = express.Router();
const User = require("../model/userModel")

const passport = require("passport")
const localStrategy = require("passport-local")
passport.use(User.createStrategy())


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/edit', function(req, res, next) {
  res.render('edit', { title: 'Express' });
});

router.post('/signup', function(req, res, next) {
  res.render('signup', {title: 'Express'});
});


router.post('/create', function(req, res, next) {
 const {firstName, lastName, password, email, phone} = req.body
 const createdUser = new User({firstName, lastName, email, phone})
 User.register(createdUser, password)
 .then(()=>{
  const authenticate = User.authenticate()
  authenticate(email, password, function(err,result){
    if(err)res.send("err")
    res.redirect("signin")
  })
 }) 
});

router.get('/signin', function(req, res, next) {
  if(req.user){
    res.redirect("/profile")
  }
  res.render('signin', { title: 'Express' });
});
router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logOut(function(){
    res.redirect('/');
  })
});

router.post('/signin',passport.authenticate("local", {
    successRedirect:("profile"),
   failureRedirect:("signin")
}), function(req, res, next) {
 
});

function isLoggedIn (req, res,next){
  if(req.isAuthenticated()){
    next()
    return;
  }
  res.redirect("/profile");
}
router.get('/profile', isLoggedIn, function (req, res, next) {

  res.render("profile", {user: req.user} )
});
module.exports = router;
