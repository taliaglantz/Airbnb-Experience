import mongoose from 'mongoose'
import { dbURI } from '../config/environment.js'


const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI)
    console.log("Database is connected")

    await mongoose.connection.db.dropDatabase()
    console.log("Database has been dropped")

    //* Seed files would be connected here

    await mongoose.connection.close()
    console.log("Connection to database closed")

  } catch (err) {
    console.log(err)
    console.log("Something has gone wrong")
    await mongoose.connection.close()
    console.log("Connection to database closed")
  }
}
seedDatabase()
