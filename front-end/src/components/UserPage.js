import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
// import { getTokenFromLocalStorage } from './Helpers/Auth'

const UserPage = () => {
  const [profile, setProfile] = useState([])
  const [hasError, setHasError] = useState([])
  // const [experiences, setExperiences] = useState([])
  // const { id } = useParams()

  // const getTokenFromLocalStorage = () => {
  //   return window.localStorage.getItem('token')
  // }

  // const getPayLoad = () => {
  //   const token = getTokenFromLocalStorage()
  //   if (!token) return
  //   const splitToken = token.split('.')
  //   if (splitToken.length < 3) return
  //   const payLoadString = splitToken[1]
  //   return JSON.parse(atob(payLoadString))
  // }

  // const userIsOwner = (currentUserId) => {
  //   const payload = getPayLoad()
  //   if (!payload) return false
  //   return currentUserId === payload.sub
  // }

  //! GET EXPERIENCE DATA
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/experiences')
  //       setExperiences(data)
  //       //console.log('EXPERIENCES ->', response) // this works
  //     } catch (err) {
  //       setHasError(true)
  //     }
  //   }
  //   getData()
  // }, [])

  //! GET PROFILE DATA
  useEffect(() => {
    const getData = async () => {
      try {
        // const { data } = await axios.get(`/api/profile/${id}`, {
        const { data } = await axios.get('/api/profile/61935c9b6145fd0fd98ee3bc', {
          headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTk2Nzg3YTBlODU0Y2UzYzVhNGJhZjEiLCJpYXQiOjE2MzcyNTEyMDksImV4cCI6MTYzNzUxMDQwOX0.2QwXoKE7UfE3T-5tLWaPmZO90F6Whs1PVlB4q5pX3r4' }
        })
        console.log('DATA =>', data)
        setProfile(data)
      } catch (err) {
        setHasError(true)
        console.log('ERROR =>', err)
      }
    }
    getData()
  }, [])

  //! STORE PROFILE DETAILS
  const userDetails = { ...profile }
  console.log('USER DETAILS =>', userDetails)

  // const ProfileCard = () => {
  //   <Card
  //   image={userDetails.profilePicture}
  // }

  //! STORE DATA
  // return (
  //     < div className = 'header-div' >
  // <p>{experiences.length} experiences</p>
  // <Header as='h3'>Experiences in London</Header>
  // <p>Review COVID-19 travel restrictions before you book. <a href='https://www.airbnb.co.uk/help/topic/1418/government-travel-restrictions-and-advisories' target='blank'>Learn more</a></p>
  // </div >
  //   <div>
  //     {experiences.length ?
  //       <div>
  //         <Divider />
  //         {experiences.map(experience => {
  //           return (

  //             <div className='experience-segment' key={experience._id}>

  //               <div>
  //                 <img className='experience-image' src={experience.image[0]} />
  //               </div>

  //               <div className='right-content'>
  //                 <div>
  //                   <p>{experience.category} in {experience.location}</p>
  //                   <div className='header'>
  //                     <h4>{experience.name}</h4>
  //                     <Icon id='heart' name='heart outline' size='big' />
  //                   </div>

  //                   <p className="what-we-will-do">What we&apos;ll do:</p>
  //                   <p className="description">{experience.description}</p>
  //                   <p>{experience.duration / 60} hours</p>
  //                 </div>
  //                 <div className='reviews-and-price'>
  //                   <p>{experience.reviews}TBC reviews</p>
  //                   <h5><strong>From {experience.price}</strong>/person</h5>
  //                 </div>
  //                 <div>
  //                   <Divider />
  //                   {/* Can't get this below the image!!!! */}
  //                 </div>
  //               </div>

  //             </div>

  //           )
  //         })}
  //       </div>
  //       :
  //       <h2>{hasError ? 'Something has gone wrong!' : 'loading experiences...'}</h2>
  //     }
  //   </div>
  // </Container >
  // )

  // const userDate = {userDetails.dob} 

  const Page = () => (
    <Grid columns={2} padded='vertically' centered>
      <Grid.Column mobile={16} tablet={8} computer={6}>
        <Card>
          <div className='profile-image'>
            <Card.Content>
              <Image src={userDetails.profilePicture} wrapped ui={true} size='medium' circular />
            </Card.Content>
          </div>
          <Card.Content>
            <Card.Header>
              {userDetails.firstName} has verified
            </Card.Header>
            <br></br>
            <Card.Meta>
              <span className='identity' padded='vertically'>
                <Icon name='check' /> Identity</span>
            </Card.Meta>
            <br></br>
            <Card.Meta>
              <span className='email' padded='vertically'>
                <Icon name='check' /> Email address</span>
            </Card.Meta>
            <br></br>
            <Card.Meta>
              <span className='phone' padded='vertically'>
                <Icon name='check' /> Phone number</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              Confirming account info helps keep the Experience community secure.
            </Card.Description>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            {userDetails.firstName}&apos;s Contact Details
          </Card.Content>
          <Card.Content>
            <Card.Meta>
              <Icon name='phone' /> {userDetails.mobile}
            </Card.Meta>
            <br></br>
            <Card.Meta>
              <Icon name='mail' /> {userDetails.email}
            </Card.Meta>
          </Card.Content>
        </Card>
      </Grid.Column>
      <Grid.Column mobile={16} tablet={8} computer={6} centered>
        <div className='user-name'>
          <h1>Hi, I&apos;m {userDetails.firstName}</h1>
        </div>
        {/* <p>Joined in {userDetails.dob}</p> */}
        <p>Joined in 1995</p>
        <br />
        <br />
        <div className='about-anna'>
          <h4>About {userDetails.firstName}</h4>
          <br></br>
          <h4>{userDetails.about}</h4>
        </div>
        <br></br>
        <br></br>
        <div>
          <p>
            <Icon name='home' />  Lives in {userDetails.location}
          </p>
          <br></br>
          <p>
            <Icon name='talk' /> {userDetails.firstName} can speak {userDetails.languages}
          </p>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <Card>
          <Card.Content>
            <h4>{userDetails.firstName}&apos;s Reviews</h4>
          </Card.Content>
          <Card.Description>
            <div className='profile-reviews'>
              <p>
                <Icon name='star outline' /> {userDetails.firstName} has no reviews at present.
              </p>
            </div>
            <br></br>
          </Card.Description>
        </Card>
        <br></br>
        <br></br>
        <div className='anna-wishlist'>
          <h4>{userDetails.firstName}&apos;s Wishlist</h4>
        </div>
      </Grid.Column>
    </Grid >
  )

  //! FILTER FOR EXPERIENCES THEY ARE HOSTING


  return (
    <section className="host-container">
      {profile ?
        <>
          <Page />
        </>
        :
        <h1>
          {hasError ? 'Something has gone wrong' : 'Loading profile'}
        </h1>
      }
    </section >
  )
}

export default UserPage