'use strict';
const Sequelize = require('sequelize');


// Instantiate Sequelize w/ DB
const sequelize = new Sequelize({
  dialect:'sqlite',
  storage: 'fsjstd-restapi.db'
});


// load Sequelize



const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.User = require('../models/user')(sequelize);
db.models.Course = require('../models/course')(sequelize);




  
module.exports = db;



