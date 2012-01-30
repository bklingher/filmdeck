var mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth')
  , User;

var UserSchema = new mongoose.Schema({})
UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    }
  , password: {
        extraParams: {
            email: String
            }
      , everyauth: {
            getLoginPath: '/login'
          , postLoginPath: '/login'
          // , loginView: 'login.mustache'
          , getRegisterPath: '/signup'
          , postRegisterPath: '/signup'
          // , registerView: 'register.mustache'
          , loginSuccessRedirect: '/'
          , registerSuccessRedirect: '/'
      }
    }
});
mongoose.model('User', UserSchema);

User = mongoose.model('User', UserSchema)

var VideoSchema = new mongoose.Schema({
    username  : String
  , title     : String
  , thumbUrl  : String
})
mongoose.model('Video', VideoSchema);
