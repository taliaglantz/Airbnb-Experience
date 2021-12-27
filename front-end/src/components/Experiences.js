/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Grid, Container, Header, Card, Divider, Icon } from 'semantic-ui-react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl' // yarn add react-map-gl to enable mapbox
import axios from 'axios'
import { Link } from 'react-router-dom'
import { addToWishlist } from './Helpers/wishlist'


const Experiences = () => {

  const { search } = window.location
  const categoriesString = new URLSearchParams(search).get('cat')
  const from = new Date(new URLSearchParams(search).get('from'))
  const to = new Date(new URLSearchParams(search).get('to'))
  const minPrice = Number(new URLSearchParams(search).get('pricemin'))
  const maxPrice = Number(new URLSearchParams(search).get('pricemax'))
  const minRating = Number(new URLSearchParams(search).get('rating'))

  const [experiences, setExperiences] = useState([])
  const [hasError, setHasError] = useState(false)

  const convertDate = (date) => {
    let convertedDate = String(date)
    if (date.length === 1) {
      convertedDate = ['0', ...date].join('')
    }
    return convertedDate
  }

  const checkDate = (experience) => {
    let dates = experience.date
    dates = dates.map(date => {
      return new Date(`${date.year}-${convertDate(date.month)}-${convertDate(date.day)}`)
    })
    if (dates.some(date => (date >= from) && (date <= to))) {
      return true
    } else {
      return false
    }
  }

  const checkPrice = (experience) => {
    let price = experience.price
    price = price.split('')
    price.shift()
    price = Number(price.join(''))
    if ((price >= minPrice) && (price <= maxPrice)) {
      return true
    } else {
      return false
    }
  }

  const checkRating = (experience) => {
    const rating = parseFloat(experience.averageRating)
    return (
      rating >= minRating ? true : false
    )
  }

  const filterExperiences = (experiences) => {
    const categories = categoriesString.split('_')
    let filtered = experiences
    if (categories.length && (categories[0] !== '')) {
      filtered = experiences.filter(experience => categories.some(category => category === experience.category))
    }
    if (from && (new URLSearchParams(search).get('from') !== 'Start date')) {
      filtered = filtered.filter(experience => checkDate(experience))
    }
    if (minPrice && maxPrice) {
      filtered = filtered.filter(experience => checkPrice(experience))
    }
    if (minRating >= 0) {
      filtered = filtered.filter(experience => checkRating(experience))
    }
    setExperiences(filtered)
  }

  // displaying all experiences on page
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/experiences')
        if (categoriesString || from || to) {
          filterExperiences(data)
        } else {
          setExperiences(data)
        }
        //console.log('EXPERIENCES ->', response) // this works

      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [search])

  // ***MAPBOX***

  const [viewport, setNewViewport] = useState({
    latitude: 51.513546,
    longitude: -0.112522,
    zoom: 4
  })
  const [popup, setPopup] = useState(null)

  // when mouse enters, price-marker class is removed and togggled is added -> button turns black
  const mouseEnter = (event) => {
    // console.log(event.target)
    const mapElement = document.getElementById(`button-${event.target.id}`)
    // console.log('mapElement->', mapElement)
    if (mapElement) {
      mapElement.classList.remove('price-marker')
      mapElement.classList.add('toggled')
    }
  }

  // when mouse leaves, toggled class is removed and price-marker is added -> button turns white
  const mouseLeave = (event) => {
    // console.log(event.target)
    const mapElement = document.getElementById(`button-${event.target.id}`)
    // console.log('mapElement->', mapElement)

    if (mapElement) {
      mapElement.classList.add('price-marker')
      mapElement.classList.remove('toggled')
    }
  }



  // viewport to access location of current user
  // useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition(position => {
  //     const { latitude, longitude } = position.coords
  //     setNewViewport({ latitude, longitude })
  //   })
  // }, [])

  //console.log(viewport)
  // console.log(popup)
  // console.log('EXPERIENCES ->', experiences)
  return (
    <Grid divided='vertically'>
      <Grid.Row columns={2} >
        <Grid.Column width={9} id='left-column'>

          {/* Column on left */}

          <Container>
            <div className='header-div'>
              <p>{experiences.length} experiences</p>
              <Header as='h4'>Experiences in England</Header>
              <p>Review COVID-19 travel restrictions before you book. <a href='https://www.airbnb.co.uk/help/topic/1418/government-travel-restrictions-and-advisories' target='blank'>Learn more</a></p>
            </div>
            <div>
              {experiences.length ?
                <div>
                  <Divider />
                  {experiences.map(experience => {
                    return (


                      <div key={experience._id}>
                        <div className='experience-segment'>
                          <Icon id={experience._id} onClick={event => {
                            addToWishlist(event)
                          }} className='heart' name='heart outline' size='big' />
                          <Link to={`/experiences/experience/${experience._id}`} className='whole-segment' id={experience._id} onMouseOver={mouseEnter} onMouseLeave={mouseLeave}>
                          </Link>
                          <div className='experience-image' style={{ background: `url(${experience.image[0]})` }} />
                          <div className='right-content'>
                            <div>
                              <p>{experience.category} in {experience.location}</p>
                              <div className='header'>
                                <h4>{experience.name}</h4>
                              </div>

                              <p className="what-we-will-do">What we&apos; ll do: </p>
                              <p className="description">{experience.description}</p>
                              <p>{experience.duration > 90 ? <span>{experience.duration / 60} hours</span> : <span>{experience.duration} mins</span>}</p>
                            </div>
                            <div className='reviews-and-price'>
                              <p><Icon name='star' className='coral' centered size='small' />{experience.averageRating} ({experience.reviews.length})</p>
                              <h5><strong>From {experience.price}</strong>/person</h5>
                            </div>
                          </div>
                        </div>
                        <Divider />
                      </div >
                    )
                  })}
                </div >
                :
                <h2>{hasError ? 'Something has gone wrong!' : 'Loading experiences...'}</h2>
              }
            </div >

          </Container >
        </Grid.Column >

        {/* Column on right */}

        < Grid.Column width={7} >
          <div className="map">
            <div className="map-container">
              {viewport ?
                <ReactMapGL
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  // mapboxApiAccessToken='pk.eyJ1IjoidGFsaWFnbGFudHoiLCJhIjoiY2t2dTJjZ3I4MGowdTJvanRueWc3MWRrbCJ9.XHliFyEBjsvGbXdinz3nEw'
                  height='100%'
                  width='100%'
                  mapStyle='mapbox://styles/mapbox/streets-v11'
                  zoom={10}
                  latitude={viewport.latitude}
                  longitude={viewport.longitude}
                  onViewportChange={viewport => setNewViewport(viewport)} // this ensures that when the map is moved (including zoomed), the map is loaded with new viewports
                >
                  {/* Marker for user location */}
                  {/* <Marker
                    latitude={viewport.latitude}
                    longitude={viewport.longitude}
                  >
                    <span role="img" aria-label="map-marker" className="marker rocket">
                      <Icon name='map marker alternate' size='large' color='red' />
                    </span>
                  </Marker> */}
                  {/* Marker for each experience location */}
                  {experiences.map(experience => (
                    <Marker
                      key={experience._id}
                      latitude={experience.locationCoord.latitude}
                      longitude={experience.locationCoord.longitude}
                    >
                      <span onClick={() => setPopup(experience)} role="img" aria-label="map-marker" className="marker">
                        <button id={`button-${experience._id}`} className='price-marker'>{experience.price}</button>
                      </span>
                    </Marker>
                  ))}
                  {popup &&

                    // Popups in Mapbox
                    <Popup
                      id='popup'
                      latitude={popup.locationCoord.latitude}
                      longitude={popup.locationCoord.longitude}
                      closeOnClick={true}
                      onClose={() => setPopup(null)}
                      closeButton={false}
                    >
                      <Card>
                        <div className='images-in-map-card'>
                          <div>
                            <img className='image-on-left' src={popup.image[0]} />
                          </div>
                          <div className='images-in-map-card-right'>
                            <img className='image-on-right' src={popup.image[1]} />
                            <img className='image-on-right' src={popup.image[2]} />
                          </div>
                        </div>

                        <p>TBC reviews &middot; {popup.location}</p>
                        <p>{popup.name}</p>
                        <p>{popup.category} &middot; {popup.duration / 60} hours</p>
                        <p><strong>From {popup.price}</strong>/person</p>
                      </Card>

                    </Popup>
                  }

                </ReactMapGL>
                :
                <h3>Loading your experiences...</h3> // map takes ages to load and refresh so need laoding handler
              }
            </div>
          </div>
        </Grid.Column >
      </Grid.Row >
    </Grid >
  )
}
export default Experiences