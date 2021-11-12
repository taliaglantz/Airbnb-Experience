import express from 'express'
import { registerUser, loginUser } from '../controllers/auth.js'
import { secureRoute } from './secure-route.js'
import { addAComment, deleteAComment, getAllExperiences, addExperience, getSingleExperience, deleteExperience, updatedExperience } from '../controllers/experiences.js'
// import { getUserProfile } from '../controllers/users.js'

const router = express.Router()

router.route('/experiences')
  .get(getAllExperiences)
  .post( secureRoute, addExperience )

router.route('/experiences/:id')
  .get(getSingleExperience)
  .put(secureRoute, updatedExperience)
  .delete(secureRoute, deleteExperience)

router.route('/experiences/:id/comments')
  .post(addAComment)

router.route('/experiences/:id/comments/:commentId')
  .delete(deleteAComment)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('/profile')
  .get(getUserProfile)

export default router

