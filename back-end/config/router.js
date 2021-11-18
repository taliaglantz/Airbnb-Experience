import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secure-route.js'
import { addAReview, deleteAReview, getAllExperiences, addExperience, getSingleExperience, deleteExperience, updateExperience } from '../controllers/experiences.js'
import { getUserProfile } from '../controllers/users.js'

//! CREATE ROUTER FOR EACH PIECE OF FUNCTIONALITY 
const router = express.Router()

router.route('/experiences')
  .get( getAllExperiences)
  .post(secureRoute, addExperience)

router.route('/experiences/:id')
  .get(getSingleExperience)
  .put(secureRoute, updateExperience)
  .delete(secureRoute, deleteExperience)

router.route('/experiences/:id/comments')
  .post(secureRoute, addAReview)

router.route('/experiences/:id/comments/:commentId')
  .delete(secureRoute, deleteAReview)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/profile/:id')
  .get(getUserProfile)

export default router

