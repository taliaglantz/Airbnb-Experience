import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const RegisterDraft = () => {

  const history = useHistory()

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

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Form Data ->', formData)
    try {
      await axios.post('/api/register',  formData)
      history.push('/api/login')
    } catch (err) {
      console.log('Error ->', err)
      console.log(errorData)
      setErrorData(err.response.data.errors)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form-container">

      <div>
        <label>Username</label>
        <div>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>email</label>
        <div>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>password</label>
        <div>
          <input
            type="text"
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>password Confirmation</label>
        <div>
          <input
            type="text"
            name="passwordConfirmation"
            placeholder="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default RegisterDraft