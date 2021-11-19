/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Breadcrumb, Grid, Container, Card, Header, Image, Icon, Button } from 'semantic-ui-react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { getPayLoad, getTokenFromLocalStorage } from './Helpers/auth'
// Need React Location and History

const Experience = () => {

  const [experience, setExperience] = useState([])
  const [experiences, setExperiences] = useState([]) // Used for Similar experiences section
  const [hasError, setHasError] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  //const [images, setImages] = useState([])


  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/experiences/${id}`)
        // const { data } = await axios.get('/api/experiences/6193b7384e537fcd049ed78e')
        // const { data } = await axios.get('/api/experiences/618e5589869bf3b103dcbda5')
        // console.log('Data ->', data)
        window.scrollTo(0, 0)
        setExperience(data)
      } catch (err) {
        console.log('Error Getting Experience ->', err)
        setHasError(true)
      }
    }
    getData()
  }, [id])

  // console.log('Experience', experience.thingsToKnow !== undefined &&  experience.thingsToKnow[0].length === 1 ? experience.thingsToKnow[0].header : 'Loading...')

  console.log(experience.thingsToKnow)

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

  const userIsOwner = (currentHostId) => {
    const payload = getPayLoad()
    if (!payload) return false
    return currentHostId === payload.sub
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/experiences/${id}`,
        {
          headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` }
        }
      )
      setIsDeleted(true)
      setTimeout(() => {
        history.push('/')
      },2000)
    } catch (err) {
      console.log('Deleting Error ->', err)
      setHasError(err)
    }
  }

  // Place holder information for BreadCumbs
  const sections = [
    { key: 'location' , content: '', link: true }, // in content place data when it comes back
    { key: 'category', content: '', link: true } // in content place data when it comes back
  ]
  sections[0].content = experience.location
  sections[1].content = experience.category

  // Returing BreadCrumbComponent
  const BreadCrumbComponent = () => (
    <Container>
      <Breadcrumb icon="right angle" sections={sections} />
    </Container>
  )

  // Returning ExperienceTitle Component
  const ExperienceTitle = () => (
    <Container>
      <Header as="h4">{experience.name}</Header>
    </Container>
  )

  // Returning ImageGrid Component
  const ImageGrid = () => (
    <Container>
      <>
        {experience.image !== undefined && experience.image.length === 1 ? 
          <div className="main-image experience-img-single" style={{ background: `url(${experience.image !== undefined ? experience.image[0] : ''})` }}></div>
          : 
          <div className="image-grid">
            <div className="main-image experience-img-0" style={{ background: `url(${experience.image !== undefined ? experience.image[0] : ''})` }}></div>
            <div className="main-image experience-img-1" style={{ background: `url(${experience.image !== undefined ? experience.image[1] : ''})` }}></div>

            <div className="image-innner-grid">
              <div className="main-image experience-img-2" style={{ background: `url(${experience.image !== undefined ? experience.image[2] : ''})` }}></div>
              <div className="main-image experience-img-3" style={{ background: `url(${experience.image !== undefined ? experience.image[3] : ''})` }}></div>
            </div>

            <div className="main-image experience-img-4" style={{ background: `url(${experience.image !== undefined ? experience.image[4] : ''})` }}></div>
          </div>
        }
      </>
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

  // Returning ChooseAvailableDates Component
  // const ChooseAvailableDates = () => (
  //   <Header as="h3">Choose from available dates</Header>
  // )

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
  }, [])

  // Storing all experiences categories 
  const experienceCategory = []
  exploreData.map(experience => {
    experienceCategory.push(experience.category)
  })

  // Storing only one instance of the experience category
  const uniqueExperience = [...new Set(experienceCategory)]
  const currentExperienceCategory = experience.category

  const filterByCategory = () => {
    return experiences.filter(experience => {
      return experience.category === currentExperienceCategory
    })
  }

  console.log('experience locationCoord',experience.locationCoord)

  return (
    <>
      {hasError ? 
        <section className="experiences-container experience-no-longer-exists">
          <div className="experience-error">
            <Container>
              <Header as="h1">Sorry this experience no longer exists</Header>
              <Link to="/">
                <Button>Go back to the home page</Button>
              </Link>
            </Container>
          </div>
        </section>
        :
        <>
          {!isDeleted ? 
            <section className="experiences-container">
              {experience.host &&
              <>
                {userIsOwner(experience.host.id) &&
                <Container>
                  <div className="experience-user-button">
                    <Button onClick={handleDelete} negative floated='right'>Delete Experience</Button>
                    {experience.image.length <= 1 ?
                      <Button floated='right' ><Link to={`/experiences/experience/${id}/edit`}>Edit Experience</Link></Button>
                      : <></>}
                  </div>
                </Container>
                }
              </>
              }
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
                        <Icon name='heart outline' className="main-favourite-icon" data-id={experience._id}/>
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
                          
                          <Header as="h3">Where you&apos;ll be</Header>
                          <div className="map-display-wrapper">
                            <div className="map-display-container">
                              {experience ? 
                                <ReactMapGL
                                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                  height='100%'
                                  width='100%'
                                  mapStyle='mapbox://styles/mapbox/streets-v11'
                                  latitude={experience.locationCoord !== undefined ? experience.locationCoord.latitude : 0}
                                  longitude={experience.locationCoord !== undefined ? experience.locationCoord.longitude : 0}
                                  zoom={14}
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
                          <Container>
                            {experience.reviews ? 
                              <>
                                <Header as="h3">
                                  {experience.averageRating}({experience.reviews.length} Reviews)
                                </Header>
                                <div className="review-container">
                                  {experience.reviews.map((review, index) => {
                                    return (
                                      <div key={index} className="review-card">
                                        {/* <p>{review.text}</p> */}
                                        <span>{review.updatedAt.slice(0, 10)}</span>
                                        <p>{review.text.slice(0, 200)}...</p>
                                        <br></br>
                                      </div>
                                    )
                                  })}
                                </div>
                              </>
                              :
                              <Header as="h3">Unable to load reviews</Header>
                            }
                          </Container>
                        </Grid.Column>
                      </Grid.Row>
                      {/* <Grid.Row columns={1}>
                        <Grid.Column>
                          <ChooseAvailableDates />
                        </Grid.Column>
                      </Grid.Row> */}
                      <Grid.Row columns={1}>
                        <Grid.Column>
                          <Container>
                            <Header as="h3">Things to know</Header>
                            <Grid>
                              <Grid.Row>
                                <div className="things-to-know-container">
                                  {/* {experience.thingsToKnow !== undefined ?
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
                                    <div>Loading...</div>} */}
                                </div>
                              </Grid.Row>
                            </Grid>
                          </Container>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={1}>
                        <Grid.Column>
                          <>
                            <Header as="h3">Similar Experiences<span></span></Header>
                            <div className="similar-experience-container">
                              {filterByCategory().slice(0, 4).map((item, index) => {
                                // console.log(item) 
                                // console.log(item.image[0]) first image
                                // console.log(item.name)
                                // console.log(item.price)
                                return (
                                  <div key={index} className="similar-experiences-card" id={item._id}>
                                    <Link to={`/experiences/experience/${item.id}`} className="similar-experience-link">
                                      <div>
                                        {/* <img className="similar-experiences-card-img" src={item.image[1]}/> */}
                                        <div className="similar-experience-card similar-experience-img" style={{ background: `url(${item.image !== undefined ? item.image[0] : ''})` }}></div>
                                      </div>
                                      <div className="card-description">
                                        <p className="card-title">{`${item.name.slice(0, 25)}...`}</p>
                                        <p className="similar-experience-rating"><Icon name='star' size='small' className="star-rating"/>{item.averageRating}<span>({item.reviews.length})</span></p>
                                        <span className="card-price"><strong>From {item.price}</strong>/ Person</span>
                                      </div>
                                    </Link>
                                    <Icon name='heart outline' size='big' className="heart-favourite-icon"/>
                                  </div>
                                //   <div className="image-grid">
                                //   <div className="main-image experience-img-0" style={{ background: `url(${experience.image !== undefined ? experience.image[0] : ''})` }}></div>
                                //   <div className="main-image experience-img-1" style={{ background: `url(${experience.image !== undefined ? experience.image[1] : ''})` }}></div>
                          
                                //   <div className="image-innner-grid">
                                //     <div className="main-image experience-img-2" style={{ background: `url(${experience.image !== undefined ? experience.image[2] : ''})` }}></div>
                                //     <div className="main-image experience-img-3" style={{ background: `url(${experience.image !== undefined ? experience.image[3] : ''})` }}></div>
                                //   </div>
                          
                                //   <div className="main-image experience-img-4" style={{ background: `url(${experience.image !== undefined ? experience.image[4] : ''})` }}></div>
                                // </div>
                                )
                              })}
                              
                            </div>
                          </>
                        </Grid.Column>
                      </Grid.Row>
                      {/* <Grid.Row columns={1}>
                        <Grid.Column>
                          <Header as="h3">Keep exploring</Header>
                          <div className="exploring-cards">
                            {uniqueExperience.map((experience, index) => {
                              return (
                                <Card key={index} className="experience-card">
                                  <Card.Content>
                                    <Card.Header>{experience}</Card.Header>
                                  </Card.Content>
                                </Card>
                              )
                            })}
                          </div>
                        </Grid.Column>
                      </Grid.Row> */}
                    </Grid>
                  </Container>
                </>
                :
                <h1>
                  {hasError ? 'Something has gone wrong getting your experience' : 'Loading Experience'}
                </h1>
              }
            </section>
            :
            <>
              <section className="experiences-container">
                <Container>
                  <Header as="h3">Experience Deleted</Header>
                  <p>Redirecting you to the homepage now</p>
                </Container>
              </section>
            </>
          }
        </>
      }
    </>
  )
}

export default Experience