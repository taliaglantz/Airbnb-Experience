/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import { Card } from 'semantic-ui-react'

const FavouritesDraft = () => {
  const [newExperience, setNewExperience] = useState([])
  const [newArray, setNewArray] = useState(null)
  const [favourites, setFavourites] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/experiences')
        setNewExperience(data)
      } catch (err) {
        setHasError(true)
      }
      getExperienceFromLocalStorage()
    }
    getData()
  }, [])

  const getExperienceFromLocalStorage = () => {
    const retrievedData = window.localStorage.getItem('favourites')
    const arrayData = JSON.parse(retrievedData)
    setFavourites(arrayData)
  }

  useEffect(() => {
    console.log('all experiences ->', newExperience)
    try {
      const filteredExperiences = newExperience && newExperience.filter((experience) => {
        return favourites.includes(experience._id)
      })
      console.log('***filteredExperiences ->', filteredExperiences)
      setNewArray(filteredExperiences)
   
    } catch (err) {
      setHasError(true)
    }
  }, [favourites])

  console.log('favourites ->', favourites)
  console.log('newArray ->', newArray)
  return (
    <>
      <section>
        <div>
          {newArray ?
            <div>
              {newArray.map(experience => {
                return (
                  <div key={experience._id}>
                    <div>
                      <div className='images-in-map-card'>
                        <div>
                          <img className='image-on-left' src={experience.image[0]} />
                        </div>
                        <div className='images-in-map-card-right'>
                          <img className='image-on-right' src={experience.image[1]} />
                          <img className='image-on-right' src={experience.image[2]} />
                        </div>
                      </div>

                      <p>TBC reviews &middot; {experience.location}</p>
                      <p>{experience.name}</p>
                      <p>{experience.category} &middot; {experience.duration / 60} hours</p>
                      <p><strong>From {experience.price}</strong>/person</p>
                    </div>
                  </div>
                )
              })}
            </div>
            :
            <h3>
              {hasError ? 'Oops, something has gone wrong!' : 'Loading experiences...'}
            </h3>
          }
        </div>
      </section>
    </>
  )
}

export default FavouritesDraft