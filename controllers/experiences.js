import Experience from '../models/experience.js'

//! GET ALL EXPERIENCES
export const getAllExperiences = async (req, res) => {
  const experiences = await Experience.find().populate('host')
  return res.status(200).json(experiences)
}

//! CREATE EXPERIENCE
export const addExperience = async (req, res) => {
  try {
    console.log('REQ.CURRENT USER->', req.currentUser)
    const newExperience = { ...req.body, host: req.currentUser._id }
    const experienceToAdd = await Experience.create(newExperience)
    return res.status(201).json(experienceToAdd)
  } catch (err) {
    return res.status(422).json(err)
  }
}

//! GET SINGLE EXPERIENCE
export const getSingleExperience = async(req, res) => {
  try {
    const { id } = req.params
    console.log('ID->', id)
    const singleExperience = await Experience.findById(id).populate('host') // Add comments here
    if (!singleExperience) throw new Error('Not found')
    return res.status(200).json(singleExperience)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'Message': err.message })
  }
}

//! DELETE EXPERIENCE
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params
    const experienceToDelete = await Experience.findById(id)
    if (!experienceToDelete) throw new Error('Experience not found')
    if (!experienceToDelete.host.equals(req.currentUser.id)) throw new Error()
    await experienceToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'Message': 'Not found' })
  }
}

//! UPDATE EXPERIENCE
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params
    const updatedExperience = await Experience.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    if (!updatedExperience) throw new Error('Experience not found')
    return res.status(202).json(updatedExperience)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'Message': err.message })
  }
}


// ! ADD REVIEW TO EXPERIENCE
export const addAReview = async (req, res) => {
  try {
    const { id } = req.params
    const experience = await Experience.findById(id)
    if (!experience) throw new Error('Experience not found')
    const newReview = { ...req.body, owner: req.currentUser._id }
    experience.reviews.push(newReview)
    await experience.save({ validateModifiedOnly: true })
    return res.status(200).json(experience)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': err.message })
  }
}

//! DELETE REVIEW FROM EXPERIENCE
export const deleteAReview = async (req, res) => {
  try {
    const { id, reviewId } = req.params
    const experience = await Experience.findById(id)
    if (!experience) throw new Error('Experience Not Found')
    const reviewToDelete = experience.reviews.id(reviewId)
    if (!reviewToDelete) throw new Error('Comment Not Found')
    if (!reviewToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')
    await reviewToDelete.remove()
    await experience.save({ validateModifiedOnly: true })
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message' : err.message })
  }
}

