var dotenv = require('dotenv');
dotenv.load();
console.log(process.env.DEVELOPMENT_ENV_LOAD)

//App Dependencies
  var express = require('express'); // In Terminal run: npm install --save express
  var session = require('express-session');
  var passport = require('./config/ppConfig');
  var bodyParser = require('body-parser'); // In Terminal run: npm install --save body-parser
  var isLoggedIn = require('./middleware/isLoggedIn');
  var flash = require('connect-flash');
  var app = express();

//Session Configuration
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  app.use(flash());

//Passport Configuration
  console.log("test");
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static('public'))
  app.set('view engine', 'ejs'); // In Terminal run: npm install --save ejs
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(function(req, res, next) {
    // before every route, attach the flash messages and current user to res.locals
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
  });


//Listening Port
  app.listen(4200, console.log("Localhost up and running"))

//Paths & Controllers
  var path = require('path'); // In Terminal run: npm install --save path
  var auth = require("./controllers/auth.js")
  app.use("/auth", auth);

//Root Controller
  app.get('/',function(req,res){
    res.render('landing/index.ejs')
  })

//Landing Page
  app.get('/main',isLoggedIn,function(req,res){
    console.log(">>>Console.log checking  /main =>", req.user.taxi)
    res.locals.taxi = req.user.taxi
    console.log( "res.locals = ", res.locals.currentUser)

    res.render('../views/main/main.ejs')
  })
