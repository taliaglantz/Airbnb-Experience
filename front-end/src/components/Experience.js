/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Breadcrumb, Grid, Container, Card, Header, Image, GridColumn, GridRow } from 'semantic-ui-react'
import ExperiencesMap from './ExperiencesMap'
// Need React Location and History

const Experience = () => {

  const [experience, setExperience] = useState([])
  //const [images, setImages] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        // // When route is set up
        // // const { data } = await axios.get(`/api/experiences/${id}`)
        // await axios.get('/api/experiences/618e5589869bf3b103dcbda4')
        //   .then((response) => {
        //     //console.log(JSON.stringify(response))
        //     return response
        //   })
        //   .then((response) => setExperience(response.data))
        //   // Change this to experience with id 
        const { data } = await axios.get('/api/experiences/618e5589869bf3b103dcbda4')
        setExperience(data)
      } catch (err) {
        console.log('Error Getting Experience ->', err)
      }
    }
    getData().then()
  },[])

  // Place holder information
  const sections = [
    { key: 'location' , content: 'London', link: true }, // in content place data when it comes back
    { key: 'category', content: 'Nature and outdoors', link: true } // in content place data when it comes back
  ]

  const BreadCrumbComponent = () => (
    <Container>
      <Breadcrumb icon="right angle" sections={sections} />
    </Container>
  )

  // const Rating = () => <Rating />
  const Rating = () => (
    <Container>
      <div 
        className="ui rating" 
        role="radiogroup" 
        tabIndex="-1">
        <i 
          tabIndex="0" 
          aria-checked="false" 
          aria-posinset="1" 
          aria-setsize="1" 
          className="icon" 
          role="radio"
        ></i>
      </div>
    </Container>
  )
  
  // const heartIcon = () => <Icon name="save" />
  const HeartIcon = () => (
    <Container>
      <i aria-hidden="true" className="heart outline icon"></i>
      <p>save</p>
    </Container>
  )

  const ShareIcon = () => (
    <Container>
      <i aria-hidden="true" className="share square outline icon"></i>
    </Container>
  )

  const ExperienceTitle = () => (
    <Container>
      <Header as="h2">{experience.name}</Header>
    </Container>
  )

  const ImageGrid = () => (
    <Container>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            {/* <SomeImage props=index0></SomeImage> */}
            {/* {experience.image} */}
            {/* <Image className="experience-img-0" src={experience.image[0]}/> */}
            {experience.image !== undefined ? <Image className="experience-img-0" src={experience.image[0]}/> : <div>Unable to load image</div>}
          </Grid.Column>
          <Grid.Column>
            {/* <Image src={experience.image[1]} /> */}
            {experience.image !== undefined ? <Image className="experience-img-1" src={experience.image[1]}/> : <div>Unable to load image</div>}
          </Grid.Column>
          <Grid.Row>
            {/* <Image className="experience-img-2" src={experience.image[2]} /> */}
            {/* <Image className="experience-img-3"src={experience.image[3]} /> */}
            {experience.image !== undefined ? <Image className="experience-img-2" src={experience.image[2]}/> : <div>Unable to load image</div>}
            {experience.image !== undefined ? <Image className="experience-img-3" src={experience.image[3]}/> : <div>Unable to load image</div>}
          </Grid.Row>
          <Grid.Column>
            {/* <Image className="experience-img-4" src={experience.image[4]} /> */}
            {experience.image !== undefined ? <Image className="experience-img-4" src={experience.image[4]}/> : <div>Unable to load image</div>}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
  const details = { ...experience.host }
  console.log(details)

  const HostDetails = () => (
    <Container>
      <div>
        <Header as="h3">Experience hosted by {details.firstName}</Header> 
        <Image src={details.profilePicture} avatar />
      </div>
      <p>{experience.duration / 60} hours</p><p>Hosted in English</p>
    </Container>
  )

  const WhatYoullDo = () => (
    <Container>
      <Header as="h3">What you &apos;ll do</Header>
      <p>{experience.description}</p>
    </Container>
  )

  const WhatsIncludedCard = () => (
    <Card>
      <Card.Content>
        <Card.Header>
          {experience.whatIsIncluded}
        </Card.Header>
      </Card.Content>
    </Card>
  )

  const WhatsIncluded = () => (
    <Container>
      <Header as="h3">What&apos;s included</Header>
      <WhatsIncludedCard />
    </Container>
  )
  
  const MeetYourHost = () => (

    <Container className="meet-your-host">
      <Card.Description>
        <Header as="h3">Meet your host, {details.firstName}</Header>
        <Rating />
        <p>Hi! I’m Anna from Hong Kong and I live in London. I am a professional photographer, focusing on portrait, family, wedding and event photography for more than 5 years. And the major is also majoring in tourism, so it is definitely an ideal candidate for guiding and travel shooting. I am professional, attentive, patient, interesting and enthusiastic, so don’t worry, I will guide your movements carefully, so as to give you the best pictures.</p>
      </Card.Description>
    </Container>
  )

  const WhereYoullBe = () => (
    <Container>
      <Header as="h3">Where you&apos;ll be</Header>
      {/* INSERT MAP <ExperiencesMap /> */}
    </Container>
  )

  const Reviews = () => (
    <Container>
      <Header as="h3">Reviews</Header>
    </Container>
  )


  return (
    <section className="experiences-container">
      <BreadCrumbComponent />
      <ExperienceTitle />
      <div className="rlss-container">
        <div className="rating-location">
          <Rating />
        </div>
        <ShareIcon />
        <HeartIcon />
      </div>
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
              <WhatsIncluded />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column width={7}>
              <MeetYourHost />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column width={7}>
              <WhereYoullBe />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      
    </section>
  )
}

export default Experience