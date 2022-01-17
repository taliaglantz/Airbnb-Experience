/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Form, Header } from 'semantic-ui-react'
import { ImageUploadField } from './ImageUploadField'
import axios from 'axios'
import { getTokenFromLocalStorage } from './Helpers/auth'

const ExperienceForm = () => {
  const [errorData, setErrorData] = useState({
    name: undefined,
    location: undefined,
    duration: undefined,
    locationCoord:
    {
      latitude: undefined,
      longitude: undefined
    },
    date:
      [
        {
          day: undefined,
          month: undefined,
          year: undefined
        }
      ],
    description: undefined,
    category: undefined,
    //image: undefined
    price: undefined,
    thingsToKnow:
      [
        {
          text: undefined
        },
        {
          text: undefined
        }
      ],
    languages: undefined,
    whatIsIncluded: [undefined],
    image: undefined
  })
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: undefined,
    location: undefined,
    duration: undefined,
    locationCoord:
    {
      latitude: 'null',
      longitude: 'null'
    },
    date: [{
      day: 'null',
      month: 'null',
      year: 'null'
    }],
    description: undefined,
    category: undefined,
    price: undefined,
    thingsToKnow: [
      {
        header: 'What to bring',
        text: [
          undefined
        ]
      },
      {
        header: 'Cancellation policy',
        text: [
          'Cancel within 24 hours of purchasing or at least 7 days before the experience starts for a full refund.'
        ]
      }
    ],
    languages: undefined,
    whatIsIncluded: undefined,
    image: undefined
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
    const value = e.target.name === 'price' ?
      e.target.value[0] !== '£' ? `£${e.target.value}` : e.target.value : e.target.value
    if (!level) {
      setFormData({
        ...formData, [e.target.name]: value
      })
    } else {
      setFormData({
        ...formData,
        [level]: {
          ...formData[level],
          [e.target.name]: parseFloat(e.target.value)
        }
      })
    }
  }

  // console.log(formData.date[0].day)

  const handleDateChanges = level => e => {
    setFormData({
      ...formData,
      [level]: [{
        ...formData.date[0],
        [e.target.name]: Number(e.target.value)
      }]
    })

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
            Authorization: `Bearer ${getTokenFromLocalStorage()}`
          }
        }
      )
      setSubmitted(true)
    } catch (err) {
      console.log('Error ->', err)
      setErrorData(err.response.data.errors)
      console.log('errordata', errorData)
    }
  }


  const handleImageUrl = (url) => {
    setFormData({ ...formData, image: url })
  }

  const currentYear = Number((new Date).getFullYear())

  return (
    <div className='form-wrapper'>
      <div className='new-experience-form'>
        <div>
          <Header as='h1' textAlign='center'>
            <h4 className='margin-bottom'>Add a new experience</h4>
          </Header>
        </div>

        <Form onSubmit={handleSubmit} autoComplete="off">

          <Form.Input label='Name of Experience' width='16'>
            <p className='errors'>{errorData.name ? errorData.name.kind : null}</p>
            {/* <input onChange={handleChange} value={formData.name} name='name' placeholder='e.g. Afternoon Tea at Claridges' /> */}
            <input onChange={handleInputChanges()} value={formData.name} name='name' placeholder='e.g. Afternoon Tea at Claridges' />
          </Form.Input>

          <Form.Input label='Location' width='16'>
            <p className='errors'>{errorData.location ? errorData.location.kind : null}</p>
            <input onChange={handleInputChanges()} value={formData.location} name='location' placeholder='e.g. London' />
          </Form.Input>

          <Form.Input label='Duration' width='16'>
            <p className='errors'>{errorData.duration ? errorData.duration.kind : null}</p>
            <input onChange={handleInputChanges()} value={formData.duration} name='duration' placeholder='e.g. 90' type='number' />
          </Form.Input>

          <Form.Input label='Latitude' width='16'>
            <p className='errors'>{errorData['locationCoord.latitude'] ? 'required' : null}</p>
            {/* <input onChange={handleChange} value={formData.locationCoord.latitude} name='latitude' placeholder='e.g. 51.5072' /> */}
            <input onChange={handleInputChanges('locationCoord')} value={formData.locationCoord.latitude} name='latitude' placeholder='e.g. 51.5072' type="number" />
          </Form.Input>

          <Form.Input label='Longitude' width='16'>
            <p className='errors'>{errorData['locationCoord.longitude'] ? 'required' : null}</p>
            <input onChange={handleInputChanges('locationCoord')} value={formData.locationCoord.longitude} name='longitude' placeholder='e.g. 0.1276' type="number" />
          </Form.Input>

          <Form.Group>
            <Form.Input width={6} label='Day'>
              <p className='errors'>{errorData['date.0.day'] ? 'required' : null}</p>
              <select onChange={handleDateChanges('date')} value={formData.date[0] ? formData.date[0].day : null} name='day' placeholder='e.g. 13'>
                <option value={undefined} disabled selected>DD</option>
                {[...Array.from({ length: 31 }, (_, i) => i + 1)].map(day => {
                  return (
                    <option key={day} value={day}>{String(day).length === 1 ? `0${day}` : day}</option>
                  )
                })
                }
              </select>
            </Form.Input>
            <Form.Input width={6} label='Month'>
              <p className='errors'>{errorData['date.0.month'] ? 'required' : null}</p>
              <select onChange={handleDateChanges('date')} value={formData.date[0] ? formData.date[0].month : null} name='month' placeholder='e.g. 04'>
                <option value={undefined} disabled selected>MM</option>
                {[...Array.from({ length: 12 }, (_, i) => i + 1)].map(month => {
                  return (
                    <option key={month} value={month}>{String(month).length === 1 ? `0${month}` : month}</option>
                  )
                })
                }
              </select>
            </Form.Input>
            <Form.Input width={6} label='Year'>
              <p className='errors'>{errorData['date.0.year'] ? 'required' : null}</p>
              <select onChange={handleDateChanges('date')} value={formData.date[0] ? formData.date[0].year : null} name='year' placeholder='e.g. 2022'>
                <option value={undefined} disabled selected>YYYY</option>
                {[currentYear - 1, currentYear, currentYear + 1, currentYear + 2].map(year => {
                  return (
                    <option key={year} value={year}>{String(year).length === 1 ? `0${year}` : year}</option>
                  )
                })
                }
              </select>
            </Form.Input>
          </Form.Group>

          <Form.Input width='16' label='Description'>
            <p className='errors'>{errorData.description ? errorData.description.kind : null}</p>
            <textarea style={{ resize: 'none', height: '100px' }} rows="3" onChange={handleInputChanges()} value={formData.description} name='description' placeholder='Tell us about your experience' />
          </Form.Input>
          <Form.Field>
            <ImageUploadField
              value={formData.uploadImage}
              name="image"
              handleImageUrl={handleImageUrl}
            />
          </Form.Field>

          <Form.Input label='Category' width='16'>
            <p className='errors'>{errorData.category ? errorData.category.kind : null}</p>
            <select onChange={handleInputChanges()} value={formData.category} name="category" placeholder='Please select a category'>
              <option value="Entertainment">Entertainment</option>
              <option value="Food and drink">Food and drink</option>
              <option value="Art and culture">Art and culture</option>
              <option value="Nature and outdoors">Nature and outdoors</option>
              <option value="Sports">Sports</option>
              <option value="Sight seeing">Sight seeing</option>
            </select>
          </Form.Input>

          <Form.Input label='Price' width='16'>
            <p className='errors'>{errorData.price ? errorData.category.price : null}</p>
            <input onChange={handleInputChanges()} value={formData.price} name='price' placeholder='e.g. £20' />
          </Form.Input>

          <Form.Input label='Languages' width='16'>
            <input onChange={handleInputChanges()} value={formData.languages} name='languages' placeholder='e.g. English' />
          </Form.Input>

          <Form.Input label='What is included' width='16'>
            <input onChange={handleInputChanges()} value={formData.whatIsIncluded} name='whatIsIncluded' placeholder='e.g. Tickets' />
          </Form.Input>


          <Form.Input label="What to bring" width='16'>
            <input onChange={handleThingsToKnowChanges('thingsToKnow')} value={formData.thingsToKnow[0].text} name='thingsToKnow' placeholder='e.g Bring wellington boots' />
          </Form.Input>

          <div>
            {submitted ? <p className='success'>Your experience has been posted successfully!</p> : null}
            <button type='submit' className='form coral-button'>Submit Experience</button>
          </div>

        </Form>
      </div>
    </div>

  )
}

export default ExperienceForm