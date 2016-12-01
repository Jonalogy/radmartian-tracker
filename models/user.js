'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user',
  {
    email: {
      type: DataTypes.STRING,
      validate: { isEmail: { msg: 'Invalid email address' } } },
    name: {
      type: DataTypes.STRING,
      validate: { len: { args: [1, 99], msg: 'Name must be between 1 and 99 characters' } } },
    password: {
      type: DataTypes.STRING,
      validate: { len: { args: [8, 99], msg: 'Password must be between 8 and 99 characters' } } },
    taxi: {
      type: DataTypes.INTEGER,
      validate: { isInt: true, max: 9999, min: 0, msg: 'Taxi number must be a valid integer ranging from 0 ~ 9999' } },
    lat: { type: DataTypes.DECIMAL },
    lng: { type: DataTypes.DECIMAL }

   } ,
   {
      hooks: { beforeCreate: function(createdUser, options, cb) {
        console.log(">>>Console.log: Running beforeCreate hook");
        var hash = bcrypt.hashSync(createdUser.password, 10); // hash the password
        createdUser.password = hash; // store the hash as the user's password
        // continue to save the user, with no errors

        cb(null, createdUser); } // END beforeCreate
      },
      classMethods: { associate: function(models) { /* associations can be defined here */ } },
      instanceMethods: {
          validPassword: function(password) {
            console.log(">>>Console.log: Running instanceMethod- validPassword()");
            console.log("Comparing user input password: ", password)
            console.log("with bcrypt hash: ", this.password);
            console.log("Comparison result: ", bcrypt.compareSync(password, this.password))
            return bcrypt.compareSync(password, this.password); // return if the password matches the hash

          },
          toJSON: function() {
            console.log(">>>Console.log: Running instanceMethod- toJSON()");
            var jsonUser = this.get(); // get the user's JSON data
            delete jsonUser.password;  // delete the password from the JSON data, and return
            return jsonUser;
          }
        }
    } ); //END sequelize.define

    return user;
  }; //END function(sequelize, DataTypes){}
