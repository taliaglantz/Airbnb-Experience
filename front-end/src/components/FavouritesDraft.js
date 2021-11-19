/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Icon, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

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
            <div className='favourite-cards-wrapper'>
              {/* <div className='favourite-cards-container'> */}
              <Grid>
                <Grid.Row columns={4}>
                  {newArray.map(experience => {
                    return (
                      <Grid.Column key={experience._id}>
                        <Link to={`/experiences/${experience._id}`} className="each-favourite-cards" id={experience._id}>
                          <div>
                            <div className="similar-experience-card similar-experience-img" style={{ background: `url(${experience.image !== undefined ? experience.image[0] : ''})` }}></div>
                          </div>
                          <div className="card-description">
                            <p className="card-title">{experience.name}</p>
                            <p className="similar-experience-rating"><Icon name='star' size='small' className="star-rating" />{experience.averageRating}<span>({experience.reviews.length})</span></p>
                            <span className="card-price"><strong>From {experience.price}</strong>/ Person</span>
                          </div>
                        </Link>
                      </Grid.Column>
                    )
                  })}
                </Grid.Row>
              </Grid>
            </div>
            :
            <h3>
              {hasError ? 'Oops, something has gone wrong!' : 'Loading experiences...'}
            </h3>
          }
        </div>
      </section >
    </>
  )
}

export default FavouritesDraft