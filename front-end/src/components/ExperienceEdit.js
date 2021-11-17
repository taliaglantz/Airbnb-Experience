import React, { useState } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router'
import { getTokenFromLocalStorage } from './Helpers/auth'
import ExperienceForm from './ExperienceForm'



const ExpereinceEdit = () => {
  const { id } = useParams()
  const history = useHistory()
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
    //console.log('Form Data ->', formData)
    try {
      await axios.post(
        `http://localhost:4000/api/experiences/${id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
        }
      )
      history.push(`/api/experiences${id}`)
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
export default ExpereinceEdit