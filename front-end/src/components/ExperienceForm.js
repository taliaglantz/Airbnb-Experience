/* eslint-disable no-unused-vars */
import React from 'react'
import { Form } from 'semantic-ui-react'
// import { Form, Button, TextArea, Input, Select } from 'semantic-ui-react'
import { ImageUploadField } from '../components/ImageUploadField'

const ExperienceForm = ({ handleSubmit, handleChange, formData, setFormData }) => {

  const handleImageUrl = (url) => {
    setFormData({ ...formData, uploadImage: url })
  }

  const categories = [
    {
      key: 'Food and drink',
      text: 'Food and drink',
      value: 'Food and drink'
    },
    {
      key: 'Entertainment',
      text: 'Entertainment',
      value: 'Entertainment'
    },
    {
      key: 'Sports',
      text: 'Sports',
      value: 'Sports'
    },
    {
      key: 'Art and culture',
      text: 'Art and culture',
      value: 'Art and culture'
    },
    {
      key: 'Nature and outdoors',
      text: 'Nature and outdoors',
      value: 'Nature and outdoors'
    },
    {
      key: 'Sightseeing',
      text: 'Sightseeing',
      value: 'Sight seeing'
    }
  ]
  return (
    <div className='form-wrapper'>
      <div className='new-experience-form'>
        <Form onSubmit={handleSubmit}>

          <Form.Field onChange={handleChange} value={formData.name}>
            <label>Name of Experience</label>
            <Form.Input width={6} placeholder='e.g. Afternoon Tea at Claridges' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.location}>
            <label>Location</label>
            <Form.Input width={4} placeholder='e.g. London' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.duration}>
            <label>Duration (in mins)</label>
            <Form.Input width={2} placeholder='e.g. 90' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.locationCoord.latitude}>
            <label>Latitude of location</label>
            <Form.Input width={4} placeholder='e.g. 51.5072' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.locationCoord.longitude}>
            <label>Longitude of location</label>
            <Form.Input width={4} placeholder='e.g. 0.1276' />
          </Form.Field>

          <Form.Group>
            <Form.Input label='Day' onChange={handleChange} value={formData.date[0].day} width={2} placeholder='e.g. 13' />
            <Form.Input label='Month' onChange={handleChange} value={formData.date[0].month} width={2} placeholder='e.g. 04' />
            <Form.Input label='Year' onChange={handleChange} value={formData.date[0].year} width={2} placeholder='e.g. 2022' />
          </Form.Group>

          <Form.Input width={10} onChange={handleChange} value={formData.description} rows={5} label='Description' placeholder='Tell us about your experience' />

          <Form.Dropdown width={6} selection fluid text='Please select a category' options={categories} value={formData.category} onChange={handleChange} label='Category' />

          <Form.Input width={3} icon='pound sign' iconPosition='left' placeholder='e.g. 50' onChange={handleChange} value={formData.price} label='Price' />

          <Form.TextArea width={10} onChange={handleChange} value={formData.thingsToKnow[0].text} rows={2} label='Guest requirements' placeholder='e.g. Please bring a form of ID' />
          <Form.TextArea width={10} onChange={handleChange} value={formData.thingsToKnow[1].text} rows={2} label='What to bring' placeholder='e.g. Hiking shoes' />
          <Form.TextArea width={10} onChange={handleChange} value={formData.thingsToKnow[2].text} rows={2} label='Cancellation Policy' placeholder='e.g. Cancel within 24 hours of booking' />

          <Form.Field onChange={handleChange} value={formData.languages}>
            <label>Languages</label>
            <Form.Input width={5} placeholder='e.g. English' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.whatIsIncluded[0]}>
            <label>Included</label>
            <Form.Input width={5} placeholder='e.g. Tickets' />
          </Form.Field>

          <div>
            <ImageUploadField
              value={formData.uploadImage}
              name="uploadImage"
              handleImageUrl={handleImageUrl}
            />
          </div>

          <Form.Button>Submit Experience</Form.Button>

        </Form>
      </div>
    </div>
    
  )
}

export default ExperienceForm

