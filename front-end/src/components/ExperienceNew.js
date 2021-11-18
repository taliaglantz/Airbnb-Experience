import React, { useState } from 'react'
import axios from 'axios'
// import { getTokenFromLocalStorage } from './Helpers/auth'
import ExperienceForm from './ExperienceForm'


const ExperienceNew = () => {

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    duration: '',
    locationCoord: 
      {
        latitude: '',
        longitude: ''
      },
    date: 
      [
        {
          day: '',
          month: '',
          year: ''
        }
      ],
    description: '',
    category: '',
    price: '',
    thingsToKnow: [
      {
        header: 'What to bring',
        text: [
          ''
        ]
      },
      {
        header: 'Cancellation policy',
        text: [
          'Cancel within 24 hours of purchasing or at least 7 days before the experience starts for a full refund.'
        ]
      }
    ],
    languages: '',
    whatIsIncluded: '',
    image: ''
  })



  const [errorData, setErrorData] = useState({
    name: '',
    location: '',
    duration: '',
    locationCoord: 
      {
        latitude: '',
        longitude: ''
      },
    date: 
      [
        {
          day: '',
          month: '',
          year: ''
        }
      ],
    description: '',
    category: '',
    //image: ''
    price: '',
    thingsToKnow: 
    [
      { 
        text: '' 
      },
      { 
        text: '' 
      }
    ],
    languages: '',
    whatIsIncluded: [''],
    image: ''
  })

  // const handleChange = (event) => {
  //   // const { target } = event
  //   const newFormData = { ...formData, [event.target.name]: event.target.value }
  //   console.log('Form Data ->', formData)
  //   console.log('Event Target Value ->', event.target.value)
  //   setFormData(newFormData)
  //   console.log('formData - look at this one!!-> ', formData)
  // }

  const handleInputChanges = level => e => {
    if (!level) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    } else {
      setFormData({
        ...formData,
        [level]: {
          ...formData[level],
          [e.target.name]: e.target.value
        }
      })
    }
  }

  // console.log(formData.date[0].day)

  const handleDateChanges = level => e => {
    if (!level) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    } else {
      setFormData({
        ...formData,
        [level]: [{
          ...formData.date[0],       
          [e.target.name]: e.target.value
        }]
      })
    }
  }

  const handleThingsToKnowChanges = level => e => {
    if (!level) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    } else {
      setFormData({
        ...formData,
        [level]: [{
          ...formData.thingsToKnow[0],
          ['text']: e.target.value
        }]
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('Submitted Form Data ->', formData)
    try {
      await axios.post('/api/experiences',
        formData,
        {
          headers: { 
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTk2MWMxNzNjNzgzYjg2Zjg2MTVkNzciLCJpYXQiOjE2MzcyNzY0NDEsImV4cCI6MTYzNzUzNTY0MX0.rTwzI-0TSBNJOSf-Bn8DSWOUYdu4Vbfj0ATTWkHJAGc' }
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
          handleInputChanges={handleInputChanges}
          formData={formData}
          errors={errorData}
          setFormData={setFormData}
          handleDateChanges={handleDateChanges}
          handleThingsToKnowChanges={handleThingsToKnowChanges}
        />
      </div>
    </section>
  )

}

export default ExperienceNew



