// import passport from 'passport'
// var passport = require('passport');
// import oauth from 'routes/oauth'

// var oauth = require('routes/oauth');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
// ふむと呼ばれるjsたち
//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var scriptRouter = require('./routes/script');
var app = express();

const passport = require('./auth');
const session = require('express-session');
const flash = require('connect-flash');
// view engine setup

app.use(passport.initialize());
//app.use('/auth/', oauth)

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(session({
  secret: 'YOUR-SECRET-STRING',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret_char',
}));
app.use(passport.session());




// ログインフォーム
app.get('/login', (req, res) => {
  console.log('ログインしてください');
  // const errorMessage = req.flash('error').join('<br>');
  res.render('login/form', {
    // errorMessage: errorMessage
  });
});

//ログイン実行
app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true,
    badRequestMessage: '「メールアドレス」と「パスワード」は必須入力です。'
  })
);


/* const authMiddleware = (req, res, next) => {
  if(req.isAuthenticated()) { // ログインしてるかチェック
    console.log('ログインしています');
    next();

  } else {
    console.log('ログインしてません');
    res.redirect(302, '/login');

  }
}; */

function authMiddleware(req, res, next){
    if (req.isAuthenticated()) {  // 認証済
        return next();
    }
    else {  // 認証されていない
        res.redirect('/login');  // ログイン画面に遷移
    }
}


// ログイン成功後のページ
app.get('/users', authMiddleware, (req, res) => {
  const user = req.user;
  res.send('ログイン完了！');
});

//どのurlをふむとどのjsが呼び出されるかはapp.jsで管理するapp.use(url, モジュール)
// app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/script', scriptRouter);
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
  res.render('error');
});

const port = 3000

const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
});

module.exports = app;
