require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
// const logger = require('morgan');

const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const mysql = require('mysql');

const knex = require('./database/connection');
const indexRouter = require('./routes/index.route');
const accountsRouter = require('./routes/accounts.route');
const layoutPath = require('./common/layoutPath');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', layoutPath.PRIMARY_LAYOUT, layoutPath.SECOND_LAYOUT);

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'node_s-group',
};

const sessionStore = new MySQLStore(options);

app.use(
    session({
        key: process.env.SESSION_COOKIE_NAME,
        secret: process.env.SESSION_COOKIE_SECRET,
        store: sessionStore,
        maxAge: 10 * 60 * 1000,
        resave: true,
        saveUninitialized: false,
    })
);

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/accounts', accountsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
});

module.exports = app;
