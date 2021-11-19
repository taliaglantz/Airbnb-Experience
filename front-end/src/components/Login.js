import React, { useState } from 'react'
import axios from 'axios'

const Login = ({ state, setState, setUsername }) => {
  const handleClick = () => {
    setState(!state)
  }

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const [errorData, setErrorData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleChange = (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    console.log('Event Target Value ->', event.target.value)
    setFormData(newFormData)
  }

  // this takes in a token arguement
  const setItemToLocalStorage = (token) => {
    // In order to access local storage we access it through the window
    window.localStorage.setItem('token', token)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Form Data ->', formData)
    try {
      const { data } = await axios.post('/api/login', formData)
      setItemToLocalStorage(data.token)
      console.log('Data ->', data)
      setUsername(formData.username.charAt(0).toUpperCase() + formData.username.substr(1).toLowerCase())
      handleClick()
    } catch (err) {
      console.log('Error ->', err)
      console.log(errorData)
      setErrorData(err.response.data.errors)
    }
  }

  return (
    <div className='popup-screen'>
      <div className='popup-window'>
        <i className='close icon' onClick={handleClick} />
        <div className='popup-header'>
          <h5>Log in</h5>
          <hr />
        </div>
        <h4 className='popup-title'>Welcome back to Airbnb Experience!</h4>
        <form onSubmit={handleSubmit} className='popup-form-container'>
          <div>
            <div className='ui input input-field first'>
              <div className='input-label'>
                <p>Username</p>
              </div>
              <input
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='ui input input-field'>
            <div className='input-label'>
              <p>Email</p>
            </div>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className='ui input input-field'>
            <div className='input-label'>
              <p>Password</p>
            </div>
            <input
              type='text'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className='ui input input-field last'>
            <div className='input-label'>
              <p>Password confirmation</p>
            </div>
            <input
              type='text'
              name='passwordConfirmation'
              placeholder='Password confirmation'
              value={formData.passwordConfirmation}
              onChange={handleChange}
            />
          </div>
          <button className='coral-button' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )

}
export default Login