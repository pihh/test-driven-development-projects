require('dotenv').config()

const express = require('express');
const path = require('path');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const setup = require('./config/setup');

const { transformResponse } = require('./utils/response');

const indexRouter = require('./resources/index');
const rolesRouter = require('./resources/roles/roles');
const usersRouter = require('./resources/users/users');
const todosRouter = require('./resources/todos/todos');

setup();

const app = express();

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
app.use('/api/roles', rolesRouter);
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
  res.status(err?.status || 500);
  try{
    err= JSON.parse(JSON.stringify(err, Object.getOwnPropertyNames(err)));
    delete err.stack
  }catch(ex){

  }
  res.json(transformResponse(err,false));
});




module.exports = app;
