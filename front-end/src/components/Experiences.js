import React, { useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from 'react-map-gl'
import locationData from '../data/locations'


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

  const [viewport, setNewViewport] = useState(null)
  const [popup, setPopup] = useState(null)

  const handleNewLocation = ({ longitude, latitude }) => {
    setNewViewport({
      longitude,
      latitude,
      zoom: 13,
      transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
      transitionDuration: 'auto'
    })
  }

  //console.log('REACT_APP_MAPBOX_ACCESS_TOKEN ->', process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setNewViewport({ latitude, longitude, zoom: 12, bearing: 0, pitch: 0 })
    })
  }, [])

  //console.log(viewport)
  // console.log(popup)

  return (
    <Grid divided='vertically'>
      <Grid.Row columns={2} >
        <Grid.Column width={9}>
          <MapController onClick={handleNewLocation} />
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
          <p>AAAA</p>
        </Grid.Column>
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
                  onViewportChange={(viewport) => setNewViewport(viewport)}
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
                <h1>Loading your location...</h1>
              }
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid >
  )
}
export default Experiences