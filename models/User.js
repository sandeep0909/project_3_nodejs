var
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  userSchema = mongoose.Schema({
    // create a local object and store data inside it
    local: {
      name: String,
      email: String,
      password: String
    },
    // _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    intEvents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}],
    extEvents:[{type: String}]
  })
  //generate hash of password. Get the password from the form field password
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password){
    //this is to validate.
  return bcrypt.compareSync(password, this.local.password)
}
  //Create the User table in mongo
var User = mongoose.model('User', userSchema)
  //expose User to other items
module.exports = User
