if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
// used variables
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')



const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)
// local user, saved only on session.
const users = []

// use variables
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//css
app.use(express.static('public'));
//render index/ home page when logged in
app.get('/', checkAuthenticated, (req, res) =>{
    res.render('index.ejs', { name: req.user.name })
})
//render login page
app.get('/login', checkNotAuthenticated, (req, res) =>{
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: 'login',
    failureFlash: true
}))
//render register page
app.get('/register', checkNotAuthenticated, (req, res) =>{
    res.render('register.ejs')
})
//get login info
app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword 

        })
        res.redirect('login')
    } catch {
        res.redirect('/register')
    }
    console.log(users)

})

//log out function
app.post('/logout', function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  });

//function to check if the user is authenticated
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/login')
}
//check if the user is not authenticated
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}
//process.exit();
app.listen(5000)