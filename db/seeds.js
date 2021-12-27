import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'
import Experience from '../models/experience.js'
import experienceData from './data/experiences.js'
import User from '../models/user.js'
import userData from './data/users.js'

const seedDatabase = async () => {
  try {
    // * connect to database
    await mongoose.connect(dbURI)
    console.log("🔗 Database is connected")

    // * drop the database
    await mongoose.connection.db.dropDatabase()
    console.log("🎤 Database has been dropped")

    // * add user to database
    const users = await User.create(userData)
    console.log('User has been added to database')

    // * add owner to expereince from experienceData so each one has an owner attached 
    const experiencesWithHost = experienceData.map(experience => {
      experience.host = users[0]._id
      return experience
    })
    console.log('EXPERIENCE WITH OWNERS ->', experiencesWithHost)

    // * add experience data to database
    const experiences = await Experience.create(experiencesWithHost)
    console.log(`DB has been seeded with ${experiences.length} experiences`)

    // * Close connection 
    await mongoose.connection.close()
    console.log("❌ Connection to database closed")

  } catch (err) {
    console.log(err)
    console.log("🚨 Something has gone wrong")
    await mongoose.connection.close()
    console.log("❌ Connection to database closed")
  }
}
seedDatabase()
