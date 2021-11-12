import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Breadcrumb, Grid, Container, Card, Header } from 'semantic-ui-react'

const Experience = () => {

  const [experience, setExperience] = useState([])
  //const [images, setImages] = useState([])

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
      <Header as="h2">{experience.name}</Header>
    </Container>
  )

  const ImageGrid = () => (
    <Container>
      <Grid>
        <Grid.Row columns={4}>
          <Grid.Column>
            {/* <Image className="experience-img-0" src={experience.image[0]}/> */}
          </Grid.Column>
          <Grid.Column>
            {/* <Image src={experience.image[1]} /> */}
          </Grid.Column>
          <Grid.Row>
            {/* <Image className="experience-img-2" src={experience.image[2]} /> */}
            {/* <Image className="experience-img-3"src={experience.image[3]} /> */}
          </Grid.Row>
          <Grid.Column>
            {/* <Image className="experience-img-4" src={experience.image[4]} /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )

  const HostDetails = () => (
    <Container>
      {/* Experience hosted by goes here */}
      <Header as="h3">Experience hosted by</Header> 
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
        <Header as="h3">Meet your host, </Header>
        <Rating />
        <p>Sightseeing and Afternoon Tea All in One! Come and experience Afternoon Tea with a difference on our exclusive and unique Afternoon Tea Bus. Our vintage 1960&apos;s Routemaster bus will drive you through the streets of Central London, taking in some of the City’s best sights, whilst you indulge in our fabulous Afternoon Tea. Capture the heart of the city’s culture, landmarks and history on our London Routemaster Bus, whilst sipping on a lovely cup of tea and enjoying the exquisite tastes of England & France. High tea accompanied with an array of tasty sandwiches and delicious cakes and pastries. Please do not hesitate to check all our distancing measures on our blog and socials: https://b-bakery.com/london/blog/social-distancing-and-safety-on-our-buses.</p>
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