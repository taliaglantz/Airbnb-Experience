import React from 'react'
// import { Form, Button, TextArea, Input, Select } from 'semantic-ui-react'

const ExperienceForm = ({ handleSubmit, handleChange, formData }) => {

  // const categoryOptions = [
  //   { 
  //     key: '1',
  //     text: 'Food and drink',
  //     value: 'Food and drink'
  //   },
  //   { 
  //     key: '2',
  //     text: 'Sightseeing',
  //     value: 'Sightseeing'
  //   },
  //   { 
  //     key: '3',
  //     text: 'Sports',
  //     value: 'Sports'
  //   },
  //   { 
  //     key: '4',
  //     text: 'Art and culture',
  //     value: 'Art and culture'
  //   },
  //   { 
  //     key: '5',
  //     text: 'Entertainment',
  //     value: 'Entertainment'
  //   },
  //   { 
  //     key: '6',
  //     text: 'Nature and outdoors',
  //     value: 'Nature and outdoors'
  //   }
  // ]


  return (
    <form onSubmit={handleSubmit} className="form-container">

      <div>
        <label>Name</label>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Location</label>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Duration</label>
        <div>
          <input
            type="number"
            name="duration"
            placeholder="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Description</label>
        <textarea value={formData.description} onChange={handleChange} name='description' rows='10' cols='30'>Enter description here</textarea>
      </div>

      <div>
        <label htmlFor='categories'>Category</label>
        <select onChange={handleChange} id='categories' name='categories'>
          <option value='Food and drink'>Food and drink</option>
          <option value='Sightseeing'>Sightseeing</option>
          <option value='Art and culture'>Art and culture</option>
          <option value='Sports'>Sports</option>
          <option value='Entertainment'>Entertainment</option>
          <option value='Nature and outdoors'>Nature and outdoors</option>
        </select>
      </div>

      <div>
        <label>Price</label>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Languages</label>
        <div>
          <input
            type="text"
            name="languages"
            placeholder="Languages"
            value={formData.languages}
            onChange={handleChange}
          />
        </div>
      </div>


      <button type="submit">Submit</button>
    </form>
  )
}

export default ExperienceForm

// name: '',
//     location: '',
//     duration: '',
//     description: '',
//     category: '',
//     image: [],
//     occupation: '',
//     about: '',
//     dob: '',
//     price: '',
//     languages: ''