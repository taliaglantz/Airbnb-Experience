import React from 'react'
// import { Form, Button, TextArea, Input, Select } from 'semantic-ui-react'

const ExperienceForm = ({ handleSubmit, handleChange }) => {

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
    <form onSubmit={handleSubmit}>

      <div>
        <label>Name</label>
        <div>
          <input 
            type="text"
            name="name"
            placeholder="Name"
            value={FormData.name}
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
            value={FormData.location}
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
            value={FormData.duration}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Description</label>
        <div>
          <input 
            type="text"
            name="description"
            placeholder="Description"
            value={FormData.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Category</label>
        <div>
          <input 
            type="text"
            name="category"
            placeholder="Category"
            value={FormData.category}
            onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label>Price</label>
        <div>
          <input 
            type="number"
            name="price"
            placeholder="Price"
            value={FormData.price}
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
            value={FormData.languages}
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