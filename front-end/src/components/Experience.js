/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Breadcrumb, Rating, Icon, Grid, Image, Container, Card } from 'semantic-ui-react'

const Experience = () => {

  const [experience, setExperience] = useState([])

  useEffect(() => {
    
    const getData = async () => {
      try {
        // When route is set up
        // const { data } = await axios.get(`/api/experiences/${id}`)
        const { data } = await axios.get('/api/experiences/618e5589869bf3b103dcbda4') // Change this to experience with id 
        console.log(data)
        setExperience(data)
      } catch (err) {
        console.log('Error Getting Experience ->', err)
      }
    }
    getData()
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
      <i aria-hidden="true" className="heart outline icon"><p>save</p></i>
    </Container>
  )

  const ShareIcon = () => (
    <i aria-hidden="true" className="share square outline icon"></i>
  )

  const ExperienceTitle = () => (
    <Container>
      <h4>{experience.name}</h4>
    </Container>
  )

  const ImageGrid = () => (
    <Container>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            <Image src='https://via.placeholder.com/350' />
          </Grid.Column>
          <Grid.Column>
            <Image src='https://via.placeholder.com/350' />
          </Grid.Column>
          <Grid.Row>
            <Image src='https://via.placeholder.com/150' />
            <Image src='https://via.placeholder.com/150' />
          </Grid.Row>
          <Grid.Column>
            <Image src='https://via.placeholder.com/350' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )

  const HostDetails = () => (
    <Container>
      {/* Experience hosted by goes here */}
      <h4>Experience hosted by</h4> 
      <p>{experience.duration / 60} hours</p><p>Hosted in English</p>
    </Container>
  )

  const WhatYoullDo = () => (
    <Container>
      <h4>What you &apos;ll do</h4>
      <p>We&apos;ll take you round Big Ben, The Houses of Parliament, Westminster Abbey, St James’s Park, Hyde Park, The Royal Albert Hall, Marble Arch, Nelson’s Column, Downing Street and more. The London sightseeing tour lasts approximately 1 hour and 30 minutes. You can choose your dietary requirement: Vegetarian, Pescetarian, Halal, Vegan and Gluten Free* (*may contain traces), if you would like any of these special menu please mention it upon…</p>
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
      <h4>What&apos;s included</h4>
      <WhatsIncludedCard />
    </Container>
  )

  const MeetYourHost = () => (
    <Container>
      <Card.Description>
        <h4>Meet your host, {experience.host.firstName}</h4>
      </Card.Description>
    </Container>
  )

  return (
    <section className="experiences-container">
      <BreadCrumbComponent />
      <ExperienceTitle />
      <div className="rlss-container">
        <div className="rating-location">
          <Rating />

          <p>London, United Kingdom</p>
        </div>
        <div className="share-save">
          <ShareIcon />
          <HeartIcon/>
        </div>
      </div>
      <ImageGrid />
      <HostDetails />
      <WhatYoullDo />
      <WhatsIncluded />
      <MeetYourHost />
    </section>
  )
}

export default Experience