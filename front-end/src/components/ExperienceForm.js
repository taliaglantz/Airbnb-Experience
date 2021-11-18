/* eslint-disable no-unused-vars */
import React from 'react'
import { Form, Header } from 'semantic-ui-react'
import { ImageUploadField } from '../components/ImageUploadField'

const ExperienceForm = ({ handleSubmit, handleChange, formData, setFormData }) => {

  const handleImageUrl = (url) => {
    setFormData({ ...formData, uploadImage: url })
  }

  // const categories = [
  //   {
  //     key: 'Food and drink',
  //     text: 'Food and drink',
  //     value: 'Food and drink'
  //   },
  //   {
  //     key: 'Entertainment',
  //     text: 'Entertainment',
  //     value: 'Entertainment'
  //   },
  //   {
  //     key: 'Sports',
  //     text: 'Sports',
  //     value: 'Sports'
  //   },
  //   {
  //     key: 'Art and culture',
  //     text: 'Art and culture',
  //     value: 'Art and culture'
  //   },
  //   {
  //     key: 'Nature and outdoors',
  //     text: 'Nature and outdoors',
  //     value: 'Nature and outdoors'
  //   },
  //   {
  //     key: 'Sightseeing',
  //     text: 'Sightseeing',
  //     value: 'Sight seeing'
  //   }
  // ]
  return (
    <div className='form-wrapper'>
      <div className='new-experience-form'>
        <div>
          <Header as='h2' textAlign='center'>
            <Header.Content>Add a new experience</Header.Content>
          </Header>
        </div>

        <Form onSubmit={handleSubmit}>

          <Form.Input label='Name of Experience' width={6}>
            <input onChange={handleChange} value={formData.name} name='name' placeholder='e.g. Afternoon Tea at Claridges' />
          </Form.Input>


          

          <Form.Input width={4} label='Location'>
            <input onChange={handleChange} value={formData.location} name='location' placeholder='e.g. London' />
          </Form.Input>

          {/* <Form.Field onChange={handleChange} value={formData.duration} name='duration'>
            <label>Duration (in mins)</label>
            <Form.Input width={2} placeholder='e.g. 90' />
          </Form.Field> */}

          {/* <Form.Field onChange={handleChange} value={formData.locationCoord.latitude} name='locationCoord.latitude'>
            <label>Latitude of location</label>
            <Form.Input width={4} placeholder='e.g. 51.5072' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.locationCoord.longitude} name='locationCoord.longitude'>
            <label>Longitude of location</label>
            <Form.Input width={4} placeholder='e.g. 0.1276' />
          </Form.Field>

          <Form.Group>
            <Form.Field onChange={handleChange} value={formData.date[0].day} name='date[0].day'>
              <label>Day</label>
              <Form.Input width={2} placeholder='e.g. 13' />
            </Form.Field>
            <Form.Field onChange={handleChange} value={formData.date[0].month} name='date[0].month'>
              <label>Month</label>
              <Form.Input width={2} placeholder='e.g. 04' />
            </Form.Field>
            <Form.Field onChange={handleChange} value={formData.date[0].year} name='date[0].year'>
              <label>Year</label>
              <Form.Input width={2} placeholder='e.g. 2022' />
            </Form.Field>
          </Form.Group>

          <Form.Field onChange={handleChange} value={formData.description} name='description'>
            <label>Description</label>
            <Form.TextArea width={10} rows={5} placeholder='Tell us about your experience' />
          </Form.Field>


          <Form.Field onChange={handleChange} value={formData.category} name='category'>
            <label>Category</label>
            <Form.Dropdown width={3} selection placeholder='Please select a category' options={categories} />
          </Form.Field>



          <Form.Field onChange={handleChange} value={formData.price} name='price'>
            <label>Price</label>
            <Form.Input width={3} icon='pound sign' iconPosition='left' placeholder='e.g. 50' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.thingsToKnow[0].text} name='thingsToKnow[0].text'>
            <label>Guest requirements</label>
            <Form.TextArea width={10} rows={2} placeholder='e.g. Please bring a form of ID' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.thingsToKnow[0].text} name='thingsToKnow[0].text'>
            <label>What to bring</label>
            <Form.TextArea width={10} rows={2} placeholder='e.g. Hiking shoes' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.thingsToKnow[0].text} name='thingsToKnow[0].text'>
            <label>Cancellation Policy</label>
            <Form.TextArea width={10} rows={2} placeholder='e.g. Free cancellation within 24 hours of booking' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.languages} name='languages'>
            <label>Languages</label>
            <Form.Input width={5} placeholder='e.g. English' />
          </Form.Field>

          <Form.Field onChange={handleChange} value={formData.whatIsIncluded[0]} name='whatIsIncluded[0]'>
            <label>Included</label>
            <Form.Input width={5} placeholder='e.g. Tickets' />
          </Form.Field>

          <div>
            <ImageUploadField
              value={formData.uploadImage}
              name="uploadImage"
              handleImageUrl={handleImageUrl}
            />
          </div> */}

          <div className='submit-button'>
            <Form.Button>Submit Experience</Form.Button>
          </div>

        </Form>
      </div>
    </div>

  )
}

export default ExperienceForm

