const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const productsRouter = require('./infrustructures/routes/products')
const usersRouter = require('./infrustructures/routes/users')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/products', productsRouter);
app.use('/api/v1/users', usersRouter);

module.exports = app;