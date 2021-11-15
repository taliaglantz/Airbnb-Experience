import React from 'react'
import { Header, Image, Divider } from 'semantic-ui-react'


const ExperienceCard = ({ _id, name, image, description, duration }) => {






  return (
    <div key={_id}>


      <Image
        floated='left'
        src={image[0]}
        size='small'
      />

      <Header as='h4'>{name}</Header>
      <Divider />
      <p className="what-we-will-do">What we&apos;ll do:</p>
      <p className="description">{description}</p>
      <p>{duration / 60} hours</p>
      <Divider />
    </div>


  )
}
export default ExperienceCard