//! CREATE ENVIRONMENT

import dotenv from 'dotenv'
dotenv.config()

export const port = process.env.PORT || 4000
//export const dbURI = 'mongodb://127.0.0.1:27017/api-mongodb-start'
export const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SEI-Project-3-59'
//export const dbURI = 'mongodb://localhost/back-end'
export const secret = process.env.SECRET || "this is not airbnb"