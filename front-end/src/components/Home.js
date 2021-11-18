import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Home = () => {

  const [experiences, setExperiences] = useState([])
  const currentDate = (new Date('2021/11/28')).getDate()
  const curentMonth = (new Date).getMonth() + 1
  const currentYear = (new Date).getFullYear()
  const daysInMonth = new Date(currentYear, curentMonth, 0).getDate()

  useEffect(() => {
    console.log(daysInMonth)
    console.log(currentDate)
    console.log(experiences)
    const getData = async () => {
      let nextWeekDays = Array.from(Array(7).keys())
      nextWeekDays = nextWeekDays.map(day => {
        if (day + currentDate > daysInMonth) {
          return day + currentDate - daysInMonth
        } else {
          return day + currentDate
        }
      }
      )

      try {
        // Choosing experiences happening next week
        let nextWeekExperiences = new Array
        const { data } = await axios.get('/api/experiences')
        data.forEach(experience => {
          let experienceDates = Array.from(experience.date)
          experienceDates = experienceDates.map(date => date.day)
          if (experienceDates.some(date => nextWeekDays.includes(date))) {
            nextWeekExperiences.push(experience)
          }
        })
        nextWeekExperiences = shuffleArray(nextWeekExperiences)
        setExperiences(nextWeekExperiences.splice(0, 4))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  // Randomise array order
  const shuffleArray = (array) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  }

  return (
    <div>
      <div className='hero'>
        <p className='hero-text' >Not sure where to go? Perfect.</p>
        <div className='hero-button'>
          <p>
            I&apos; m flexible
          </p>
        </div>
      </div>
      <div className='ui one column centered grid'>
        <div className='four column stackable ui grid'>

          <h3>Inspiration for your next trip</h3>

          {experiences.map(experience => {
            return (
              <div key={experience.id} className='column'>
                <div className='ui card' style={{ height: '430px', overflow: 'hidden' }}>
                  <div className='ui slide masked reveal image inspiration-image'>
                    <div className='inspiration-image visible content' style={{ background: `url(${experience.image[0]})` }} />
                    <div className='inspiration-image hidden content' style={{ background: `url(${experience.image[1]})` }} />
                  </div>
                  <div className='content'>
                    <h4 className='header'>{experience.name}</h4>
                    <div className='meta'>
                      <span >{experience.category}</span>
                    </div>
                  </div>
                  <div className='extra content' >
                    <i className='star icon theme-color' />
                    {experience.averageRating ? `${experience.averageRating} | ${experience.price} per person` : `0.00 | ${experience.price} per person` }
                  </div>
                </div>
                <p></p>
              </div >

            )
          })}
        </div >
        <div className='two column stackable ui grid'>
          <h3>Discover our experiences</h3>
          <div className='column'>
            <div className='ui segment square food'>
              <h2>Food and drink</h2>
              <p className='explore search-data'>Explore experiences..</p>
            </div>
          </div>
          <div className='column'>
            <div className='ui segment square entertainment'>
              <h2>Entertainment</h2>
              <p className='explore search-data'>Explore experiences..</p>
            </div>
          </div>
          <div className='column'>
            <div className='ui segment square nature'>
              <h2>Nature and outdoors</h2>
              <p className='explore search-data'>Explore experiences..</p>
            </div>
          </div>
          <div className='column'>
            <div className='ui segment square culture'>
              <h2>Art and culture</h2>
              <p className='explore search-data'>Explore experiences..</p>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}
export default Home