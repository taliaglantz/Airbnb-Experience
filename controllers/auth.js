import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'


//! REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body)
    return res.status(201).json({ 'message': `Thank you Registering! Welcome ${newUser.username}` })
  } catch (err) {
    console.log('ERROR!!!!', err)
    return res.status(422).json(err)
  }
}

//! LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    console.log('USER TO LOGIN ->', userToLogin)
    console.log('USER TO LOGIN ->', userToLogin.languages.length)
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '3 days' })
    return res.status(200).json({ 'message': `Welcome back ${userToLogin.username}`, token })
  } catch (err) {
    console.log(err)
    return res.status(422).json({ 'Message': 'Unauthorized'})
  }
}