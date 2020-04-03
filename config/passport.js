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
                  .then( user =>{
                        if(!user) {
                              return done(null, false, { message: 'That email is not registered!'});
                        }
                        // Match Password
                        // here we need bycrypt
                        // remember that user comes from database but password comes frpm user thats why we have to compare
                        bycrypt.compare(password, user.password, (err, isMatch) =>{
                              if(err) throw err;

                              if(isMatch){
                                    return done(null, user)
                              }else{
                                    return  done(null, false, { message: 'Password incorrect!'});
                              }
                        });
                  })

                  .catch( err => console.log(err))
            })
      );
      // After our strategy we need a method for serializing and deserializing the USER!
      // We have to call those methods from passportjs.org
      passport.serializeUser((user, done)=> {
            done(null, user.id);
          });
          
          passport.deserializeUser((id, done)=> {
            User.findById(id, (err, user)=> {
              done(err, user);
            });
          }); 

}  