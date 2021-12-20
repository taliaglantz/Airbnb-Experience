import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Card, Icon, Image, Grid } from 'semantic-ui-react'
import FavouritesDraft from '../components/FavouritesDraft'
import { getTokenFromLocalStorage } from './Helpers/auth'
const UserPage = () => {
  const [profile, setProfile] = useState([])
  const [hasError, setHasError] = useState([])
  // const [experiences, setExperiences] = useState([])
  // const { id } = useParams()

  // const userIsOwner = (currentUserId) => {
  //   const payload = getPayLoad()
  //   if (!payload) return false
  //   return currentUserId === payload.sub
  // }

  //! GET PROFILE DATA
  useEffect(() => {
    const getData = async ( ) => {
      try {
        const token = getTokenFromLocalStorage()
        const { data } = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` }
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
        <div className='anna-wishlist'>
          { profile ? <FavouritesDraft wishlist={profile.wishlist}/> : null }
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