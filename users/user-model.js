
 /**
  * 3rd party modules from npm.
  */
  const mongoose = require('mongoose');

  const UserSchema = new mongoose.Schema(
    {
      userType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType',
        required: true,
      },
      userRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserRole',
        required: true,
      },
      userStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserStatus',
        required: true,
      },
      businessId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Business',
        required: false,
      },
      businessType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessType',
        required: false,
      },
      firstName: {
        type: String,
        required: false,
      },
      lastName: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: [true, 'Please provide your email'],
        index: true,
        unique: true,
        dropDups: true,
        lowercase: true,
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: [
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please enter a valid email',
        ],
      },
      emailVerificationToken: {
        type: String,
        required: false,
      },
      emailVerified: {
        type: Boolean,
        required: false,
        default: false,
      },
      password: {
        type: String,
        required: [true, "Password can't be empty"],
        minlength: [6, 'Password must be atleast 6 character long'],
        select: false,
      },
      passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function (el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!',
        },
      },
      passwordChangedAt: {
        type: Date,
        required: false,
      },
      passwordResetToken: {
        type: String,
        required: false,
      },
      passwordResetExpires: {
        type: Date,
        required: false,
      },
      saltSecret: {
        type: String,
        required: false,
        select: false,
      },
      photo: {
        type: String,
        required: false,
      },
      designation: {
        type: String,
        required: false,
      },
      address: {
        type: String,
        required: false,
      },
      phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters'],
        required: false,
      },
      dateOfBirth: {
        type: Date,
        required: false,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: false,
      },
      termsAndConditions: {
        type: Boolean,
        required: false,
        default: false,
        select: false,
      },
      minValidJWTIat: {
        type: Date,
        required: false,
      },
      website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL with HTTP or HTTPS',
        ],
      },
      occupation: {
        type: String,
        required: false,
      },
      religious: {
        type: String,
        required: false,
      },
      active: {
        type: Boolean,
        default: true,
        select: false,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
      },
      updatedAt: {
        type: Date,
        default: Date.now(),
        select: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    }
  );
 
 
  // Export function to create "SomeModel" model class
  module.exports = mongoose.model('User', UserSchema);