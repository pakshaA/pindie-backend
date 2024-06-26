const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject(new Error("Uncorrect email or password"));

      return bcrypt.compare(password, user.password).then(matched => {
        if (!matched) return Promise.reject(new Error("Uncorrect email or password"));

        return user;
      })
    })
}

module.exports = mongoose.model('user', userSchema);
