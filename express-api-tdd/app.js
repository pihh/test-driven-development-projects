var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var db = require('./db');

db.sequelize.sync()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users/users');
var todosRouter = require('./routes/todos/todos');

const { transformResponse } = require('./utils/response');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

/**
 * Will change from jade to html
 */
// app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/todos', todosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(transformResponse(err,false));
});




module.exports = app;
