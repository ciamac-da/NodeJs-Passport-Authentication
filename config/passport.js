const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
// we need bycrypt to dycrypt the Hash!   
const bycrypt = require('bcryptjs');

// Load user Model
const User = require('../models/User');

module.exports = function(passport) {
      passport.use(
            new LocalStrategy({ usernameField: 'email'},  (email, password, done) =>{
                  // Match User
                  User.findOne({ email: email})
            })
      )
}