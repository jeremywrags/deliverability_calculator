var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');
const cors = require("cors");
require('dotenv').config();

var corsOptions = {
  origin: "http://localhost:8081"
};

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var deliverabilityRouter = require("./routes/deliverability.routes");
var authRouter = require("./routes/auth.routes")

var app = express();

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser("0NYj04gO5FtboGlYTGL9fA12PWRf5OKw"));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/slds", express.static(path.join(__dirname, 'node_modules/@salesforce-ux/design-system')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', deliverabilityRouter);
app.use('/auth', authRouter);

const db = require("./models");
db.sequelize.sync();

/*In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:*/
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

console.log(process.env.DATABASE_URL);


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

module.exports = app;
