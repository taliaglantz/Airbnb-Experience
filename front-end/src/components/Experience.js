/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Breadcrumb, Grid, Container, Card, Header, Image, GridColumn, GridRow, Icon, Rating, ItemMeta, ItemDescription } from 'semantic-ui-react'
import ReactMapGL, { Marker } from 'react-map-gl'
// Need React Location and History

const Experience = () => {

  const [experience, setExperience] = useState([])
  const [experiences, setExperiences] = useState([]) // Used for Similar experiences section
  const [hasError, setHasError] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  //const [images, setImages] = useState([])



  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/experiences/${id}`)
        // const { data } = await axios.get('/api/experiences/618e5589869bf3b103dcbda4')
        // const { data } = await axios.get('/api/experiences/618e5589869bf3b103dcbda5')
        // console.log('Data ->', data)
        setExperience(data)
      } catch (err) {
        console.log('Error Getting Experience ->', err)
        setHasError(true)
      }
    }
    getData()
  },[id]) // id

  // MAP ELEMENT
  const [viewport, setViewport] = useState({
    latitude: 51.501671,
    longitude: -0.175426,
    zoom: 4
  })

  // const [viewport, setViewport] = useState(null)

  // useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition(position => {
  //     const { longitude, latitude } = position.coords
  //     setViewport({ longitude, latitude })
  //   })
  // }, [])



  const getTokenFromLocalStorage = () => {
    return window.localStorage.getItem('token')
  }

  const getPayLoad = () => {
    const token = getTokenFromLocalStorage()
    if (!token) return
    const splitToken = token.split('.')
    if (splitToken.length < 3) return
    const payLoadString = splitToken[1]
    return JSON.parse(atob(payLoadString))
  }

  const userIsOwner = (currentUserId) => {
    const payload = getPayLoad()
    if (!payload) return false
    return currentUserId === payload.sub
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/experiences/${id}`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
        }
      )
      history.push('/experiences')
    } catch (err) {
      console.log('Deleting Error ->', err)
      setHasError(err)
    }
  }

  // Place holder information for BreadCumbs
  const sections = [
    { key: 'location' , content: 'London', link: true }, // in content place data when it comes back
    { key: 'category', content: 'Nature and outdoors', link: true } // in content place data when it comes back
  ]

  // Returing BreadCrumbComponent
  const BreadCrumbComponent = () => (
    <Container>
      <Breadcrumb icon="right angle" sections={sections} />
    </Container>
  )

  // Returning Rating Component
  //const Rating = () => <Rating />

  // const Location = () => (
  //   <Container>
  //     <Icon name='circle' size='mini' /> 
  //     <Link to={`./location/${experience.location}`}>{experience.location}</Link>
  //   </Container>
  // )

  // // Returning HeartIcons Component
  // const HeartIcon = () => (
  //   <Container>
  //     <Icon name='heart outline' />
  //     <p>save</p>
  //   </Container>
  // )

  // // Returing ShareIcon Component
  // const ShareIcon = () => (
  //   <Container>
  //     <i aria-hidden="true" className="share square outline icon"></i>
  //   </Container>
  // )

  // Returning ExperienceTitle Component
  const ExperienceTitle = () => (
    <Container>
      <Header as="h2">{experience.name}</Header>
    </Container>
  )

  // Returning ImageGrid Component
  const ImageGrid = () => (
    <Container>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            {experience.image !== undefined ? <Image className="experience-img-0" src={experience.image[0]}/> : <div>Unable to load image</div>}
          </Grid.Column>
          <Grid.Column>
            {experience.image !== undefined ? <Image className="experience-img-1" src={experience.image[1]}/> : <div>Unable to load image</div>}
          </Grid.Column>
          <Grid.Row>
            {experience.image !== undefined ? <Image className="experience-img-2" src={experience.image[2]}/> : <div>Unable to load image</div>}
            {experience.image !== undefined ? <Image className="experience-img-3" src={experience.image[3]}/> : <div>Unable to load image</div>}
          </Grid.Row>
          <Grid.Column>
            {experience.image !== undefined ? <Image className="experience-img-4" src={experience.image[4]}/> : <div>Unable to load image</div>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )

  // Storing Host Object
  const details = { ...experience.host }
  // console.log(details)

  // Returing HostDetails Component
  const HostDetails = () => (
    <Container>
      <div className="host-title">
        <Header as="h3">Experience hosted by {details.firstName}</Header> 
        <Image src={details.profilePicture} avatar />
      </div>
      <div className="experience-details">
        <p>{experience.duration > 90 ? <span>{experience.duration / 60} hours</span> : <span>{experience.duration} mins</span>}</p>
        <Icon name='circle' size='mini' /> 
        <p>Hosted in {experience.languages}</p>
      </div>
    </Container>
  )

  // Returing WhatYoullDo Component
  const WhatYoullDo = () => (
    <Container>
      <Header as="h3">What you &apos;ll do</Header>
      <p>{experience.description}</p>
    </Container>
  )

  
  // Returing WhatsIncludedCard Component
  // const WhatsIncludedCard = () => (
  //   <Card>
  //     <Card.Content>
  //       <ul>
  //         {console.log(experience.whatIsIncluded.forEach(item => console.log(item)))}
  //       </ul>
  //     </Card.Content>
  //   </Card>
  // )
  // console.log(experience.whatIsIncluded.forEach(item => console.log(item)))

  // Returing WhatsIncluded Component
  // const WhatsIncluded = () => (
  //   <Container>
  //     <Header as="h3">What&apos;s included</Header>
  //     <WhatsIncludedCard />
  //   </Container>
  // )
  
  // Returing MeetYourHost React Semantic Component
  // const MeetYourHost = () => (
  //   <Container className="meet-your-host">
  //     <div className="meet-your-host-header">
  //       <img src={details.profilePicture} alt={`${details.firstName} profile picture`} className="myh-image"/>
  //       {/* <Image src={details.profilePicture} avatar  className="myh-image"/> */}
  //       <Header as="h3">Meet your host, {details.firstName}</Header>
  //     </div>
  //     {/* Place Holder Text for now as description isnt available */}
  //     {/* <p>Hi! I’m Anna from Hong Kong and I live in London. I am a professional photographer, focusing on portrait, family, wedding and event photography for more than 5 years. And the major is also majoring in tourism, so it is definitely an ideal candidate for guiding and travel shooting. I am professional, attentive, patient, interesting and enthusiastic, so don’t worry, I will guide your movements carefully, so as to give you the best pictures.</p> */}
  //     <Icon name='star' size='small' className="star-rating"/>  (Not yet reviewed)
  //     <p className="myh-text">{details.about}</p>
  //   </Container>
  // )

  // Returning WhereYoullBe Component - Map Goes Here
  const WhereYoullBe = () => (
    <Container>
      <Header as="h3">Where you&apos;ll be</Header>
      <>
        
      </>
      {/* INSERT MAP <ExperiencesMap /> */}
    </Container>
  )

  // Returing Reviews Component
  const Reviews = () => (
    <Container>
      <Header as="h3">Reviews</Header>
    </Container>
  )

  // Returning ChooseAvailableDates Component
  const ChooseAvailableDates = () => (
    <Header as="h3">Choose from available dates</Header>
  )

  // Returning ThingsToKnow Component
  // const ThingsToKnow = () => (
  //   <Container>
  //     <Header as="h3">Things to know</Header>
  //   </Container>
  // )

  // Returing SimilarExperiences Component
  const SimilarExperiences = () => (
    <Header as="h3">Similar Experiences</Header>
  )

  // Used for KeepExploringInLondon Component 
  // Takes in all experiences 
  const [exploreData, setexploreData] = useState([])
  useEffect(() => {
    const exloringData = async () => {
      try {
        const { data } = await axios.get('/api/experiences')
        setexploreData(data)
        setExperiences(data)
      } catch (err) {
        console.log('Error getting explore data ->', err)
      }
    }
    exloringData()
  },[])

  // Storing all experiences categories 
  const experienceCategory = []
  exploreData.map(experience => {
    experienceCategory.push(experience.category)
  })

  // Storing only one instance of the experience category
  const uniqueExperience = [...new Set(experienceCategory)]
  //console.log('Unique Experience', uniqueExperience.map(experience => console.log(experience)))

  // const [currentExperience, setcurrentExperience] = useState('')
  // console.log('Unique Experience ->', uniqueExperience)
  // console.log('This Experience Category ->', experience.category)
  // setcurrentExperience(experience.category)
  const currentExperienceCategory = experience.category

  // const filterExperienceByCategory = experiences.filter(experience => experienceCategory)

  const filterByCategory = () => {
    return experiences.filter(experience => {
      return experience.category === currentExperienceCategory
    })
  }

  // console.log('ID ->', id)

  // filterByCategory().map(item => {
  //   console.log('Filtered Item ->', item)
  // })

  const KeepExploringInLondon = () => (
    <Header as="h3">Keep exploring in London</Header>
  )

  const handleMainFavourite = (event) => {
    // console.log('Event ->', event.target.dataset.id) - Logs the id of the experience you want to favourite
    console.log('Main Favourite ->', event.target.dataset.id)
  }

  const handleSimilarFavourite = (event) => {
    // console.log('Event ->', event.target.parentElement.id)
    // Saves the id of the clicked on favourite
    console.log('Similar Experience Favourite->', event.target.parentElement.id)
  }

  console.log('Experience ->', experience.locationCoord)
  
  return (
    <section className="experiences-container">
      {experience ? 
        <>
          <BreadCrumbComponent />
          <ExperienceTitle />
          <Container>
            <div className="rating-share-container">
              <div> 
                <Icon name='star' size='small' className="star-rating"/><span>({experience.averageRating})</span>
                <Icon name='circle' size='mini' className="circle-icon" /> 
                <Link to={`./location/${experience.location}`}>{experience.location}</Link>
              </div>
              <div>
                <i aria-hidden="true" className="share square outline icon"></i>
                <Icon name='heart outline' className="main-favourite-icon" onClick={handleMainFavourite} data-id={experience._id}/>
              </div>
            </div>

          </Container>
          <ImageGrid />
          <Container>
            <Grid divided='vertically'>
              <Grid.Row columns={1}>
                <Grid.Column width={7}>
                  <HostDetails />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column width={7}>
                  <WhatYoullDo />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column width={7}>
                  <Header as="h3">What Is Included</Header>
                  <div className="whats-included-container">
                    {experience.whatIsIncluded ? 
                      <>
                        {experience.whatIsIncluded.map((item, index) => {
                          return (
                            <Card className="whats-included-card" key={index}>
                              <Header as="h4">{item}</Header>
                            </Card>
                          )
                        })}
                      </>
                      : 'Loading'
                    }
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column width={7}>
                  {/* <MeetYourHost /> Old React Semantic Component */}
                  <Container className="meet-your-host">
                    <div className="meet-your-host-header">
                      <img src={details.profilePicture} alt={`${details.firstName} profile picture`} className="myh-image"/>
                      {/* <Image src={details.profilePicture} avatar  className="myh-image"/> */}
                      <Header as="h3">Meet your host, {details.firstName}</Header>
                    </div>
                    {/* Place Holder Text for now as description isnt available */}
                    {/* <p>Hi! I’m Anna from Hong Kong and I live in London. I am a professional photographer, focusing on portrait, family, wedding and event photography for more than 5 years. And the major is also majoring in tourism, so it is definitely an ideal candidate for guiding and travel shooting. I am professional, attentive, patient, interesting and enthusiastic, so don’t worry, I will guide your movements carefully, so as to give you the best pictures.</p> */}
                    <Icon name='star' size='small' className="star-rating"/>  (Not yet reviewed)
                    <p className="myh-text">{details.about}</p>
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {/* <WhereYoullBe /> */}
                  {/* MAP COMPONENT GOES IN HERE */}
                  <Header as="h3">Where you&apos;ll be</Header>

                  <div className="map-wrapper">
                    <div className="map-container">
                      {viewport ? 

                        <ReactMapGL
                          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                          height='100%'
                          width='100%'
                          mapStyle='mapbox://styles/mapbox/streets-v11'
                          latitude={viewport.latitude}
                          longitude={viewport.longitude}
                          zoom={14}
                          onViewportChange={(viewport) => setViewport(viewport)}
                        >
                          <Marker longitude={experience.locationCoord !== undefined ? experience.locationCoord.longitude : 0} latitude={experience.locationCoord !== undefined ? experience.locationCoord.latitude : 0}>
                            <span><Icon name='map marker alternate' size='big' color='red' /></span>
                          </Marker>
                        </ReactMapGL>
                        :
                        <h1>Loading your location</h1>
                      }
                    </div>
                  </div>




                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Reviews />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <ChooseAvailableDates />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {/* <ThingsToKnow /> */}
                  <Container>
                    <Header as="h3">Things to know</Header>
                    <Grid>
                      <Grid.Row>
                        <div className="things-to-know-container">
                          {experience.thingsToKnow !== undefined ?
                            experience.thingsToKnow.map((item, index) => {
                              // console.log('Header ->', item.header)
                              return (
                                <div key={index} className="things-to-know-element">
                                  <Header as="h4">{item.header}</Header>
                                  {item.text.map((item, index) => {
                                    return (
                                      //console.log('Text Content ->',item)
                                      <p key={index}>{item}</p>
                                    )
                                  })}
                                </div>
                              )
                            }) 
                            : // Loading state
                            <div>Loading...</div>}
                        </div>
                      </Grid.Row>
                    </Grid>
                  </Container>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {/* <SimilarExperiences /> */}
                  <>
                    <Header as="h3">Similar Experiences<span></span></Header>
                    <div className="similar-experience-container">
                      {filterByCategory().map((item, index) => {
                        // console.log(item) 
                        // console.log(item.image[0]) first image
                        // console.log(item.name)
                        // console.log(item.price)
                        return (
                          <div key={index} className="similar-experiences-card" id={item._id}>
                            <Link to={`/experiences/${item.id}`} className="similar-experience-link">
                              <div>
                                <img className="similar-experiences-card-img" src={item.image[1]}/>
                              </div>
                              <div className="card-description">
                                <p className="card-title">{`${item.name.slice(0, 25)}...`}</p>
                                <span className="card-price"><strong>From {item.price}</strong>/ Person</span>
                              </div>
                            </Link>
                            <Icon name='heart outline' size='big' className="heart-favourite-icon" onClick={handleSimilarFavourite}/>
                          </div>
                        )
                      })}
                      
                    </div>
                  </>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={1}>
                <Grid.Column>
                  {/* <KeepExploringInLondon /> */}
                  <Header as="h3">Keep exploring</Header>
                  <div className="exploring-cards">
                    {uniqueExperience.map((experience, index) => {
                      return (
                        // <Card key={index} className="experience-card">
                        //   <Card.Content className="experience-card-content" textAlign={'center'}>
                        //     <Card.Header>{experience.category}</Card.Header>
                        //   </Card.Content>
                        // </Card>
                        <Card key={index} className="experience-card">
                          <Card.Content>
                            <Card.Header>{experience}</Card.Header>
                          </Card.Content>
                        </Card>
                      )
                    })}
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </>
        :
        <h1>
          {hasError ? 'Something has gone wrong getting your experience' : 'Loading Experience'}
        </h1>
      }
    </section>
  )
}

export default Experience