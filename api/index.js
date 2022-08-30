const express = require('express');
const {default: mongoose} = require('mongoose')
const app = express()
const usersRouter = require('../src/routers/users')
const activitesRouter = require('../src/routers/activities')

const cors = require('cors')
const config = require('../config')
app.use(cors())

if (config.isVercel) {
    app.use(async (req, res, next) => {
      await mongoose.connect(config.mongoUri, config.mongoOptions);
      return next();
    });
  }
var bodyParser = require("body-parser");

app.use(bodyParser.json({limit: '1mb'}));

app.use(express.json());

app.use('/users',usersRouter)
app.use('/activities',activitesRouter)

module.exports = app
