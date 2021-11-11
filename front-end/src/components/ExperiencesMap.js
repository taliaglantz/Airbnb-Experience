/* eslint-disable no-unused-vars */
import React from 'react'
import ReactMapGL from 'react-map-gl'
// import locationData from '../data/locations'
import 'dotenv/config'
import { Container } from 'semantic-ui-react'




const ExperiencesMap = () => {
  // const [viewPort, setViewPort] = useState(null)
  const REACT_APP_MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGFsaWFnbGFudHoiLCJhIjoiY2t2dTJjZ3I4MGowdTJvanRueWc3MWRrbCJ9.XHliFyEBjsvGbXdinz3nEw'
  console.log('REACT_APP_MAPBOX_ACCESS_TOKEN ->', REACT_APP_MAPBOX_ACCESS_TOKEN)

  // useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition(position => {
  //     const { latitude, longitude } = position.coords
  //     setViewPort({ latitude, longitude })
  //   })
  // }, [])

  return (

    <>
      <h1>Map</h1>
      {/* {viewPort ? */}
      <Container>
        <ReactMapGL
          mapboxApiAccessToken={REACT_APP_MAPBOX_ACCESS_TOKEN}
          height='100%'
          width='100%'
          mapStyle='mapbox://styles/mapbox/streets-v11'
          zoom={5}
          // latitude={viewPort.latitude}
          // longitude={viewPort.longitude}
          latitude={51.509240}
          longitude={0.005540}
        // onViewPortChange={(viewport) => setViewPort(viewport)}
        />
      </Container>
      {/* <Marker latitude={viewPort.latitude} longitude={viewPort.longitude}>
        🦋
      </Marker> */}

      {/* : 
      <h1>Loading your location</h1>
      } */}

    </>

  )


}

export default ExperiencesMap