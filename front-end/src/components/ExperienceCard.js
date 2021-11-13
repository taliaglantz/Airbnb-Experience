import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'


const ExperienceCard = ({ _id, name, image, description, duration }) => {


  return (

    <div>
      <Card className='card' key={_id}>
        <div>
          <Image
            floated='left'
            src={image[0]}
            size='small'
          />
        </div>

        <div>
          <Header as='h4'>{name}</Header>
          <p className="what-we-will-do">What we&apos;ll do:</p>
          <p className="description">{description}</p>
          <p>{duration / 60} hours</p>
        </div>
      </Card>
    </div>
  )
}
export default ExperienceCard