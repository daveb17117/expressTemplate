var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var engine = require('express-dot-engine');
var fileUpload = require('express-fileupload');
var session = require('express-session');


var app = express();

// String capitalization
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.substring(1).toLowerCase();
}

// Logger
app.use(logger('dev'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// File Upload
app.use(fileUpload());

// View Engine
app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'dot');

// simple session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Set Static Pathes
app.use(express.static(path.join(__dirname, 'public')));

// Import Controllers
app.use(require('./controllers'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;