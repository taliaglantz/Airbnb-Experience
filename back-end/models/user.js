import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true },
  mobile: { type: String, unique: true },
  profilePicture: { type: String },
  password: { type: String, required: true },
  isHost: { type: Boolean },
  location: { type: String },
  languages: [{ type: String }],
  occupation: { type: String },
  about: { type: String },
  dob: { type: Date },
  wishlist: [{ type: mongoose.Schema.ObjectId, ref: 'Experience' }], // do we import this?
  experiences: [{ type: mongoose.Schema.ObjectId, ref: 'Experience' }]
},
{
  timestamp: true
})

userSchema
  .virtual('passwordConfirmation')
  .set(function(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function() {
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

  userSchema.plugin(uniqueValidator)


export default mongoose.model('User', userSchema)