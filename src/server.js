'use strict';

const express = require('express');
// const logger = require('./middleware/logger');
const foodRouter = require('./routes/foodRoute');
const clothesRouter = require('./routes/clothesRoute');
const notFound = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);
// app.use(logger);

app.get('/', (req, res, next) => {
  res.status(200).send('hello');
});

app.get('/bad', (req, res, next) => {
  next('this route is bad');
});

app.use('*', notFound);

app.use(errorHandler);

function start(){
  app.listen(PORT, () => console.log('listening on port', PORT));
}

module.exports = {app, start};
