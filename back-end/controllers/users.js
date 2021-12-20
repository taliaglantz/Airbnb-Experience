import User from '../models/user.js'

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.currentUser.id).populate('createdExperiences')
    if (!user) throw new Error()
    return res.status(200).json(user)
    // console.log('User ->', user)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'Message': 'Not found' })
  }
}

export const updateUserProfile = async (req, res) => {
  
  try {
    const { id } = req.currentUser
    console.log('iddddddddd', id)
    const updatedProfile = await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    console.log(updatedProfile)
    if (!updatedProfile) return Error()
    return res.status(202).json(updatedProfile)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ 'message': 'not found' })
  }
}
