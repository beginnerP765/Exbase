var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var myappRouter = require('./routes/myapp');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/myapp', myappRouter);

// /errにアクセスした際に500エラーを発生させるルーティング
app.get('/err', function(req, res, next){
  res.render('index', {test: hoge})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(app.get('env'))

  if(app.get('env') === 'development'){
    res.status(err.status || 500);
    res.render('error');
  } else {
    // render the error page
    res.status(err.status || 500);
    console.log(res.statusCode)
    if(res.statusCode == 404){
      return res.render('error/404');
    } else {
      return res.render('error/500')
    }
  }
});

module.exports = app;
