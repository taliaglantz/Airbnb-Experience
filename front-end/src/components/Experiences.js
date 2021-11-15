import React, { useState, useEffect } from 'react'
import { Grid, Container } from 'semantic-ui-react'
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from 'react-map-gl' // yarn add react-map-gl to enable mapbox
import locationData from '../data/locations'
import axios from 'axios'
import ExperienceCard from './ExperienceCard'

// Map controller

const MapController = ({ onClick }) => {
  return (
    <div className="map-controller">
      <div className="buttons">
        {locationData.map(location => (
          <button
            key={location.id}
            className="button is-small is-rounded is-info"
            onClick={() => onClick(location)}
          >
            {location.icon}
          </button>
        ))
        }
      </div>
    </div>
  )
}

const Experiences = () => {

  //***MAPBOX***

  const [viewport, setNewViewport] = useState(null)
  const [popup, setPopup] = useState(null)

  // Moving to new location on map
  const handleNewLocation = ({ longitude, latitude }) => {
    setNewViewport({
      longitude,
      latitude,
      zoom: 13,
      transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
      transitionDuration: 'auto'
    })
  }

  // viewport to access location of current user
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setNewViewport({ latitude, longitude, zoom: 12, bearing: 0, pitch: 0 })
    })
  }, [])

  //console.log(viewport)
  // console.log(popup)

  // ***EXPERIENCES***

  const [experiences, setExperiences] = useState([])
  const [hasError, setHasError] = useState(false)

  // displaying all experiences on page
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/experiences')
        setExperiences(data)
        //console.log('EXPERIENCES ->', response) // this works
      } catch (err) {
        setHasError(true)
      }
    }
    getData()
  }, [])


  //console.log('EXPERIENCES ->', experiences)
  return (
    <Grid divided='vertically'>
      <Grid.Row columns={2} >
        <Grid.Column width={9}>

          {/* Column on left */}

          <MapController onClick={handleNewLocation} />
          <Container>
            {experiences.length ?
              <div>
                {experiences.map(experience => {
                  return (
                    <ExperienceCard key={experience._id} {...experience} />
                  )
                })
                }
              </div>
              :
              <h2>{hasError ? 'Something has gone wrong!' : 'loading experiences...'}</h2>
            }
          </Container>
        </Grid.Column>


        {/* Column on right */}

        <Grid.Column width={7}>
          <div className="map">
            <div className="map-container">
              {viewport ?
                <ReactMapGL
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  height='100%'
                  width='100%'
                  mapStyle='mapbox://styles/mapbox/streets-v11'
                  zoom={10}
                  latitude={viewport.latitude}
                  longitude={viewport.longitude}
                  onViewportChange={(viewport) => setNewViewport(viewport)} // this ensures that when the map is moved (including zoomed), the map is loaded with new viewports
                >
                  <Marker
                    latitude={viewport.latitude}
                    longitude={viewport.longitude}
                  >
                    <span role="img" aria-label="map-marker" className="marker rocket">🚀</span>
                  </Marker>
                  {locationData.map(location => (
                    <Marker
                      key={location.id}
                      latitude={location.latitude}
                      longitude={location.longitude}
                    >
                      <span onClick={() => setPopup(location)} role="img" aria-label="map-marker" className="marker">{location.icon}</span>
                    </Marker>
                  ))}
                  {popup &&
                    <Popup
                      latitude={popup.latitude}
                      longitude={popup.longitude}
                      closeOnClick={true}
                      onClose={() => setPopup(null)}
                    >
                      <div>{popup.name}</div>
                    </Popup>
                  }

                </ReactMapGL>
                :
                <h1>Loading your location...</h1> // map takes ages to load and refresh so need laoding handler
              }
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid >
  )
}
export default Experiences