import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

//* review schema
const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' }, //! THIS NEEDS A REQUIRED TRUE - HOW TO GENERATE RANDOM USER?
  rating: { type: Number, required: true, min: 1, max: 5 }
},
{
  timestamps: true
})

//* Experience schema
const experienceSchema = new mongoose.Schema({
  name: { type: String },
  location: { type: String },
  locationCoord: { type: Object },
  date: [{ type: Object }],
  duration: { type: Number },
  description: { type: String },
  category: { type: String },
  image: [{ type: String }],
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  host: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, //! CURRENTLY ALL ANNA (FIRST USER IN DB - NEED TO HAVE RANDOM)
  price: { type: String },
  thingsToKnow: [{ type: Object }],
  languages: [{ type: String }],
  accessibilty: [{ type: String }],
  whatIsIncluded: [{ type: String }],
  reviews: [reviewSchema] //! ASSUME THIS REQUIRES SOMETHING LIKE ...REQ.PARAMS, REVIEWSCHEMAYAR
})

//*virtual field
experienceSchema.virtual('averageRating')
  .get(function () {
    if (!this.reviews.length) return 'Not rated yet'
    const sumOfRatings = this.reviews.reduce((acc, review) => {
      if (!review.rating) return acc
      return acc + review.rating
    }, 0)
    return (sumOfRatings / this.reviews.length).toFixed(2)
  })

experienceSchema.set('toJSON', { virtuals: true })
experienceSchema.plugin(uniqueValidator)

export default mongoose.model('Experience', experienceSchema)