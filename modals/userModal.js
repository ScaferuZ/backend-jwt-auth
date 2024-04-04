const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// do not user arrow functions as we need to use "this" keyword inside
userSchema.statics.signup = async function (email, password) {
  // validation, mongoDB has some built in validation
  if (!email || !password) {
    throw Error("One or more fields are empty");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }

  // email exist? or not?
  const exist = await this.findOne({ email });
  // since we use the database instance,
  // we can use 'this' to use database related operations

  if (exist) {
    throw Error("Email already exist");
  }

  // create salt
  const salt = await bcrypt.genSalt(10);

  // create hash of password + salt and finally insert to DB
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  //  validate the credentials
  if (!email || !password) {
    throw Error("One or more fields are empty");
  }

  // find the email in the DB
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Looks like the email address is not registered");
  }

  // match the password
  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect Password");

  // return the user if password is correct
  return user;
};

module.exports = mongoose.model("user", userSchema);
