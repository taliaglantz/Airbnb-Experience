import express from 'express'
import { addAComment, deleteAComment, getAllExperiences, addExperience, getSingleExperience, deleteExperience, updatedExperience } from '../controllers/experiences.js'
import { registerUser, loginUser } from '../controllers/auth.js'
import { getUserProfile } from '../controllers/users.js'

const router = express.Router()

router.route('/experiences')
  .get(getAllExperiences)
  .post( addExperience )

router.route('experiences/:id')
  .get(getSingleExperience)
  .put(updatedExperience)
  .delete(deleteExperience)

router.route('/experiences/:id/comments')
  .post(addAComment)

router.route('/experiences/:id/comments/:commentId')
  .delete(deleteAComment)

router.route('/register')
  .post(registerUser)

router.route('/login')
  .post(loginUser)

router.route('profile')
  .get(getUserProfile)

export default router

