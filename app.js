let express = require('express');
let exphbs  = require('express-handlebars');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');

let index = require('./routes/index');
let about = require('./routes/about');
let contact = require('./routes/contact');
let accounts = require('./routes/accounts/accounts');
let account = require('./routes/accounts/account');
let authUser = require('./routes/login');
let trainings = require('./routes/trainings');
let weights = require('./routes/weights');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/'));

app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], 'MyTD-RESTAPI', function(err, decode) {
            if (err)
              req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

app.use('/', index);
app.use('/tokens', authUser);
app.use('/about', about);
app.use('/contact', contact);
app.use('/accounts', accounts);
app.use('/accounts', account);
app.use('/training-activities', trainings);
app.use('/weights', weights);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
