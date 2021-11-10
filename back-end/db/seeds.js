import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'


const seedDatabase = async () => {
  try {
    // * connect to database
    await mongoose.connect(dbURI)
    console.log("🔗 Database is connected")

    // * drop the database
    await mongoose.connection.db.dropDatabase()
    console.log("🎤 Database has been dropped")

    // * add user to database
    // * add experience data to database

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
