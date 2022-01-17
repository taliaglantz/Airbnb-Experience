/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Icon, Grid, Container, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const FavouritesDraft = ({ wishlist }) => {
  console.log(wishlist)
  // const [newExperience, setNewExperience] = useState([])
  // const [newArray, setNewArray] = useState(null)
  const [filteredExperiences, setFilteredExperiences] = useState([])
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/experiences')
        const filtered = new Array
        data.forEach(experience => {
          if (wishlist.some(id => id === experience.id)) {
            filtered.push(experience)
          }
        })
        setFilteredExperiences(filtered)

      } catch (err) {
        setHasError(true)
      }
      // getExperienceFromLocalStorage()
    }
    getData()
  }, [])

  // const getExperienceFromLocalStorage = () => {
  //   const retrievedData = window.localStorage.getItem('favourites')
  //   const arrayData = JSON.parse(retrievedData)
  //   setFavourites(arrayData)
  // }

  // useEffect(() => {
  //   console.log('all experiences ->', newExperience)
  //   try {
  //     const filteredExperiences = newExperience && newExperience.filter((experience) => {
  //       return favourites.includes(experience._id)
  //     })
  //     console.log('***filteredExperiences ->', filteredExperiences)
  //     setNewArray(filteredExperiences)

  //   } catch (err) {
  //     setHasError(true)
  //   }
  // }, [favourites])

  // console.log('favourites ->', favourites)
  console.log('filteredExperiences ->', filteredExperiences)
  return (
    <>

      {filteredExperiences.length ?
        <>
          <h3 className='not-indented'>Favourites</h3>
          {/* <div className='favourite-cards-container'> */}
          <Grid.Column className='similar-experience-container'>
            {filteredExperiences.map(experience => {
              return (
                <div key={experience._id} className="similar-experience-card-container" id={experience._id}>
                  <Link to={`/experiences/experience/${experience._id}`} className="similar-experience-link">
                    <div>
                      {/* <img className="similar-experiences-card-img" src={experience.image[1]}/> */}
                      <div className='ui slide masked reveal image inspiration-image'>
                        <div className='similar-experience-card similar-experience-imgvisible content' style={{ background: `url(${experience.image[0]})` }} />
                        <div className='similar-experience-card similar-experience-img hidden content' style={{ background: `url(${experience.image[1]})` }} />
                      </div>
                      {/* <div className="similar-experience-card similar-experience-img" style={{ background: `url(${experience.image !== undefined ? experience.image[0] : ''})` }}></div> */}
                    </div>
                    <div className="card-description">
                      <p className="card-title">{`${experience.name.slice(0, 25)}...`}</p>
                      <p className="similar-experience-rating"><Icon name='star' size='small' className="star-rating" />{experience.averageRating}<span>({experience.reviews.length})</span>
                        <span className="card-price"><strong>From {experience.price}</strong>/ Person</span>
                      </p>
                    </div>
                  </Link>
                </div>
              )
            })}

          </Grid.Column>
        </>

        :
        <h3>
          {hasError ? 'Oops, something has gone wrong!' : ''}
        </h3>
      }

    </>
  )
}

export default FavouritesDraft