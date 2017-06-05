const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const http = require('http');

mongoose.connect('mongodb://localhost/loginapp');
const db = mongoose.connection;

// Routes
const routes = require('./routes/index');
const users = require('./routes/users');
const sensors= require('./routes/sensors');

// Init App
const app = express();
const server = http.createServer(app);
global.io = require('socket.io').listen(server);

// View Engine
app.set('views',path.join(__dirname,'views'));
app.engine('hbs',hbs({
  extname:'hbs',
  defaultLayout: __dirname+'/views/layouts/layout.hbs',
  partialsDir: __dirname+'/views/partials',
  layoutDir:__dirname+'/views/layouts'
}));
app.set('view engine','hbs');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname,'public')));

// Express session
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Connect flash
app.use(flash());

// Global vars
app.use(function (req,res,next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.sensor = req.sensor || null;
  next();
});

// Routes
app.use('/',routes);
app.use('/users',users);
app.use('/sensors',sensors);

// Set Port
app.set('port',(process.env.PORT || 3000));

server.listen(app.get('port'),function () {
  console.log('Server started on port '+app.get('port'));
})
