import mongoose from 'mongoose'



const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  mobile: { type: Number, unique: true },
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

export default mongoose.model('User', userSchema)