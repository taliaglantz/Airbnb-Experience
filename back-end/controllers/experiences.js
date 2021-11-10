import Experience from '../models/experience.js'

//! Get all experiences
export const getAllExperiences = async (req, res) => {
  const experiences = await Experience.find()
  return res.status(200).json(experiences)
}

//! Create a experience
export const addExperience = async (req, res) => {
  try {
    console.log('REQ CURRENT USER ->', req.currentUser)
    const experienceToAdd = await Experience.create(req.body)
    return res.status(201).json(experienceToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
}

//! Show one experience
export const getSingleExperience = async(req, res) => {
  try {
    const { id } = req.params
    const singleExperience = await Experience.findById(id).populate('owner')
    if (!singleExperience) throw new Error()
    return res.status(200).json(singleExperience)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'Message': 'Not found' })
  }
}

//! Delete experience
export const deleteExperince = async (req, res) => {
  try {
    const { id } = req.params
    const experienceToDelete = await Experience.findById(id)
    if (!experienceToDelete) throw new Error()
    if (!experienceToDelete.owner.equals(req.currentUser.id)) throw new Error()
    await experienceToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'Message': 'Not found' })
  }
}

//! Update experience
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params
    const updatedExperience = await Podcast.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    if (!updatedExperience) throw new Error()
    return res.status(202).json(updatedExperience)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'Message': 'Not found' })
  }
}


// ! Adding Comments to experience
export const addAComment = async (req, res) => {
  try {
    const { id } = req.params
    console.log('REQ.PARAMS ID ->', id)

    const experienceToAddComment = await Experience.findById(id)
    console.log('ExperienceToAddComment ->', experienceToAddComment)

    if (!experienceToAddComment) throw new Error('Experience not found')

    const newComment = { ...req.body, owner: req.currentUser._id }
    experienceToAddComment.comments.push(newComment)

    await experienceToAddComment.save({ validateModifiedOnly: true })

    return res.status(200).json(Experience)

  } catch (err) {
    console.log('Error ->', err)
    return res.status(404).json({ 'message': err.message })
  }
}

// Deleting Comment experience
export const deleteAComment = async (req, res) => {
  try {
    const { id, commentId } = req.params

    const experienceToDeleteComment = await Experience.findById(id)

    if (!experienceToDeleteComment) throw new Error('Experience Not Found')

    const commentToDelete = experienceToDeleteComment.comments.id(commentId)

    if (!commentToDelete) throw new Error('Comment Not Found')

    if (!commentToDelete.owner.equals(req.currentUser._id)) throw new Error('Unauthorized')

    await commentToDelete.remove()

    await experienceToDeleteComment.save({ validateModifiedOnly: true })

    return res.sendStatus(204)

  } catch (err) {
    console.log('Error',err)
    return res.status(404).json({ 'message' : err.message })
  }
}

export default experiences