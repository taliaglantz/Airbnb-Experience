/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import locationData from '../data/locations'



const ExperiencesMap = () => {
  const [viewport, setViewport] = useState(null)
  const [popup, setPopup] = useState(null)

  //console.log('REACT_APP_MAPBOX_ACCESS_TOKEN ->', process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)


  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
      setViewport({ latitude, longitude })
    })
  }, [])

  //console.log(viewport)
  console.log(popup)
  return (
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
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          {locationData.map(location => {
            return (
              <Marker key={location.id} latitude={location.latitude} longitude={location.longitude}>
                <span onClick={() => setPopup(location)}>
                  {location.icon}
                </span>
              </Marker>
            )
          })}
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


  )
}
export default ExperiencesMap