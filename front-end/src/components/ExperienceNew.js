import React, { useState } from 'react'
import axios from 'axios'
// import { getTokenFromLocalStorage } from './Helpers/auth'
import ExperienceForm from './ExperienceForm'


const ExperienceNew = () => {

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    duration: '',
    description: '',
    category: '',
    price: '',
    languages: ''
  })


  const [errorData, setErrorData] = useState({
    name: '',
    location: '',
    duration: '',
    description: '',
    category: '',
    price: '',
    languages: ''
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
      await axios.post(
        'http://localhost:4000/api/experiences',
        formData,
        {
          headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTk0ZDU4OTBlNTM0OGQ5OGFkM2RmNTAiLCJpYXQiOjE2MzcxNDk3ODcsImV4cCI6MTYzNzQwODk4N30.F5ozqGRmerqz_Un9SnB-IJNlfm4YMK2BD4DPdrABQhU' }
        }
      )
    } catch (err) {
      console.log('Error ->', err)
      setErrorData(err.response.data.errors)
    }
  }

  return (
    <section>
      <div>
        <ExperienceForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
          errors={errorData}
        />
      </div>
    </section>
  )

}

export default ExperienceNew


