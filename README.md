# General Assembly Project 3: Experience

<img src="front-end/src/assets/images/readme/Screenshot 2022-01-10 at 10.43.21.png" alt="experience logo" width=300/>

## Table of Contents
- [Overview](#overview)
- [Brief](#brief)
- [Technologies used](#technologies-used)
- [Planning](#planning)
- [Build](#build)
- [Known bugs](#known-bugs)
- [Wins and Challenges](#wins)
- [Future features](#future-features)
- [Key learnings](#key-learnings)

<a name="overview"></a>
## Overview
This project was my third project created during General Assembly’s Software Engineering Immersive Course, which I completed from September-December 2021.

<strong>The goal</strong>: As part of a group, build a full-stack MERN (MongoDB, Express, React and Node.js) application.

Experience is a semi-clone of the experience tab on Airbnb. The app we created boasts the ability for the user to find experiences in London based on a date range. The user is able to view each experience’s details (including precise location), sign up and login, add experiences to a wishlist and add a new experience onto the site themselves.

I worked on the display of all the experiences alongside the interactive map, the wishlist feature and the “add an experience” form.

### Timeframe
10 days

### Deployed link
https://e-xperience.herokuapp.com/ 

### Getting started and admin login
1. Either clone or download the source code
2. Run `yarn` && `yarn start`
3. Navigate to your browser and type in `localhost:4000` to view the site

Please feel free to use the following login credentials:
- Username: taliaglantz
- Email: talia@email.com
- Password: pass

<img src="front-end/src/assets/images/readme/Screenshot 2022-01-10 at 12.32.22.png" alt="homepage" />

<a name="brief"></a>
## Brief
Here is the brief we were given:
- Build a full-stack application by making your own backend and your own front-end.
- Use an Express API to serve your data from a Mongo database.
- Consume your API with a separate front-end built with React.
- Be a complete product which most likely means multiple relationships and CRUDfunctionality for at least a couple of models.
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut.
- Have a visually impressive design to kick your portfolio up a notch.
- Be deployed online so it's publicly accessible.

<a name="technologies-used"></a>
## Technologies used

### Back-end:
- Node.js
- MongoDB
- Express
- JSON Web Token for authentication
- Mongoose
- Body parser 
- Bcrypt for password hashing

### Front-end:
- React
- Axios
- React Semantic UI (CSS Framework)
- CSS
- Nodemon
- React-router-dom for component-based routing
- react-router
- React Mapbox GL for maps
- RSuite for DateRangePicker, RangeSlider and Rate

### Dev tools:
- Insomnia
- VS code
- Google Chrome dev tools
- Heroku for deployment
- Trello for planning
- Figma for wireframing

<a name="build"></a>
## Build

### Planning 

As a group, we were really enthusiastic about creating a modern-looking app that enabled users to find cool events taking place near them. Upon concocting a list of features for this app and searching around for potentially similar-looking sites, we came across the Airbnb experiences tab. As a group of keen-travelling and generally clued-up Millenials - we were shocked we hadn’t come across it before (...you’re welcome)! Since this tab already had all the features we had spoken about and Airbnb has such incredible styling - we thought it would be a good challenge to clone it (as opposed to the bigger challenge of creating something better within a 9-day timeframe). We did make a few changes though - some additions and some editions - which will be explained. 
For our wireframing we used Figma - I had never worked this tool before so really enjoyed learning how to use it. We completed wireframes for all the components we hoped to create, and related them to the original Airbnb page, for reference.

<img src="front-end/src/assets/images/readme/Screenshot 2022-01-10 at 11.04.25.png" alt="figma board" width=450 />

To manage our time effectively, we created a Project Trello board which was initially divided into front-end and back-end tasks, which got divided up amongst the group.

<img src="front-end/src/assets/images/readme/Screenshot 2022-01-10 at 11.06.13.png" alt="figma board" width=450 />

Key dates:
- Day 1: Planning
- Day 7: MVP
- Day 9: Bonus tasks
- Day 10: Styling

From the get-go we realised how much work we had to do, so we set off by splitting the group in half and for the first day of coding, 2 people worked on the back-end and myself and another group member worked on the front-end. 
The main tasks we completed together over the first day or so were: connecting the front-end to the back-end and ensuring all the data was being pulled through, setting up all the routes in App.js, importing the CSS Framework and getting to grips with that, and then setting up all the essential components so that when the other pair were finished with the back-end, they could immediately get going with whatever they were assigned to.
Although I personally didn’t write the code for the back-end, we were all in constant conversation and if they had any problems, we were always there to talk it through with them so we could understand the “behind the scenes” of our app. We also all took on a section of the seeding as we knew this would be a bit of an arduous task that would definitely be better shared.

## Experiences.js component
Once the back-end and front-end were set-up, we divided the tasks amongst ourselves and I immediately got going with the main component that displayed all the experiences and the map for the Experiences.js component.
I immediately ensured I could pull the data through from the back-end and got it displayed in a scrollable manner in the left-hand column. Then began my journey with Mapbox! By watching demo videos and reading the docs I gradually started to understand more about it and how I could get it to work for our app. I originally had the map set up to focus around the viewport of the user, using the `getCurrentPosition` method, however since we decided to only do experiences in London, I had to pick a central London location and hard-code the longitude and latitude in as the viewport so that all the experiences could be seen on the map, regardless of the user's location. 
```
const [viewport, setNewViewport] = useState({
    latitude: 51.513546,
    longitude: -0.112522,
    zoom: 4
  })
```


I then ensured that all the experiences could be seen on the map as markers. 

```
{experiences.map(experience => (
  <Marker
    key={experience._id}
    latitude={experience.locationCoord.latitude}
    longitude={experience.locationCoord.longitude}
  >
    <span onClick={() => setPopup(experience)} role="img" aria-label="map-marker" className="marker">
      <button id={`button-${experience._id}`} className='price-marker'>{experience.price}</button>
    </span>
  </Marker>
))}
```


One of the challenges I faced was setting up the functionality that when hovering over a certain experience on the left-hand column, the popup on mapbox changed from a white background to a black background. We solved this by giving each popup an id (as shown above) and then by using DOM manipulation, toggling classes to show either the black or white button.
```
// when mouse enters, price-marker class is removed and togggled is added -> button turns black
  const mouseEnter = (event) => {
    // console.log(event.target)
    const mapElement = document.getElementById(`button-${event.target.id}`)
    // console.log('mapElement->', mapElement)
    if (mapElement) {
      mapElement.classList.remove('price-marker')
      mapElement.classList.add('toggled')
    }
  }

  // when mouse leaves, toggled class is removed and price-marker is added -> button turns white
  const mouseLeave = (event) => {
    // console.log(event.target)
    const mapElement = document.getElementById(`button-${event.target.id}`)
    // console.log('mapElement->', mapElement)

    if (mapElement) {
      mapElement.classList.add('price-marker')
      mapElement.classList.remove('toggled')
    }
  }
```

<img src="front-end/src/assets/images/readme/Screenshot 2022-01-10 at 12.09.56.png" alt="experiences page with map" />


 I optimised this to also have the functionality that the popup, when clicked on,  displays a snapshot of information of the experience in card form too. 
The filtering of the experiences was not something I worked on, however do of course understand it fully and know how it is incorporated.

I then used my mapbox knowledge and experience to build the mapbox element in the Experience.js section, and teach my fellow group member about it as well as I was implementing it.

### New Experience Form

I then worked on the “add a new experience” form - the ExperienceForm and ExperienceNew components. For me, this was one of the most challenging parts of the app, for a few reasons. Firstly, we had never used the form element on React Semantic UI and it took a long time (and a lot of hair-pulling) to get used to the correct format and use of the props. Secondly, the form was really long and had lots of different elements that were essential - for example the longitude and latitude fields to enable the location of the experience to show on mapbox. Finally, a few of the fields, for example the date one, were particularly challenging due to the complexity of the model we set up in the back-end and its nesting, e.g. arrays of objects. 
```
const [formData, setFormData] = useState({
    name: '',
    location: '',
    duration: '',
    locationCoord: 
      {
        latitude: '',
        longitude: ''
      },
    date: 
      [
        {
          day: '',
          month: '',
          year: ''
        }
      ],
    description: '',
    category: '',
    price: '',
    thingsToKnow: [
      {
        header: 'What to bring',
        text: [
          ''
        ]
      },
      {
        header: 'Cancellation policy',
        text: [
          'Cancel within 24 hours of purchasing or at least 7 days before the experience starts for a full refund.'
        ]
      }
    ],
    languages: '',
    whatIsIncluded: '',
    image: ''
  })
```
Navigating the `onChange` and `value` props were really challenging, however a group member and I managed to work together to come up with solutions. We had to create different `onChange` functions for the nested fields.

```
 const handleDateChanges = level => e => {
    if (!level) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    } else {
      setFormData({
        ...formData,
        [level]: [{
          ...formData.date[0],       
          [e.target.name]: e.target.value
        }]
      })
    }
  }
```
<img src="front-end/src/assets/images/readme/Screenshot 2022-01-15 at 18.21.54.png" alt="add an experience form" />

### Wishlist
The final component that I worked on was the favourites/wishlist feature. This was a feature that we weren’t sure we would have time to do but since we were only working on styling towards the end, we thought we could squeeze it in if we pair-programmed it. We initially had the idea of using local storage to enable the favouriting of certain experiences by the user but we optimised this and used the back-end instead as we thought it would be more efficient better practice. We ensured the user model was set up correctly in the back-end and then coded the `addToWishList` function in wishlist.js in order for the profiles of the user to be updated with whatever experience they clicked on to favourite. This is then pushed through to the front end and is then displayed in Favourites.js and subsequently pulled through to the user page in UserPage.js. 

```
export const addToWishlist = async (event, setRerender) => {
  try {
    const token = getTokenFromLocalStorage()
    const { data } = await axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    const wishlist = data.wishlist
    let newWishlist = new Array
    const experienceId = event.target.id
    if (!wishlist.includes(experienceId)) {
      newWishlist = [...wishlist, experienceId]
      event.target.classList.add('wishlist')
    } else {
      newWishlist = wishlist.filter(id => id !== experienceId)
      event.target.classList.remove('wishlist')
    }
  
    await axios.put('/api/profile', { 'wishlist': newWishlist },
      {
        headers: {
          'Authorization': `Bearer ${getTokenFromLocalStorage()}`
        }
      }
    )
    console.log('new wishlist -> ', newWishlist)

    setRerender(true)
  } catch (err) {
    console.log(err)
    console.log(err.response)
  }
}
```
<img src="front-end/src/assets/images/readme/Screenshot 2022-01-15 at 18.25.08.png" alt="wishlist" />

<a name="known-bugs"></a>
## Known bugs
- There are often problems when adding a new experience - often it doesn't show up on the index page
- Upon entering the site, the experienes page is displayed instead of the homepage
- Upon the page refeshing, the username is no longer displayed in the navbar
- We had to allocate one user as the host so all the experiences that we seeded in are hosted by Anna, we hadn't the time to figure out how to change this to have the experiences already displayed by a random user that had already been seeded.

<a name="wins"></a>
## Wins
- Given the quantity of work we had set for ourselves and the timeframe that was given within which we had to complete our project, I believe we achieved a lot and have a <strong>fully functional and well-replicated </strong>Airbnb site to show for it.
- I had never used <strong>Mapbox</strong> before and I thoroughly enjoyed reading the docs, solving errors that appeared and getting working interactive maps to appear on the pages.
- Although navigating react semantic ui was really challenging at times, I am really glad that we <strong>learn a new framework</strong> and had some solid practise in using it.
- Although it was another group member that worked on the datepicker, range and filters after importing them from RSuite, I am really glad they are in our project and I understand how to use them and how I can use them elsewhere. Having been introduced to RSuite in this project, I am looking forward to using it in the future. 
- Merging conflicts often comes with challenges and we definitely had a lot of them! However, we learnt a lot from the process and I felt far more confident with <strong>using Git as a group</strong> when going into my next project because of how much we overcame and how many errors we solved together.

<a name="challenges"></a>
## Challenges
- The biggest challenge that we faced was definitely cloning a website as detailed, perfectly styled and intricately featured as Airbnb. Many times it felt like we had completed a task or even achieved our MVP, only to realise that there was a whole section missing or there was something in the back-end that we’d have to adapt in order to replicate something on the front-end, an example of this being the favourites feature. Given the timeframe we had, quick decisions had to be made as to whether something was a priority to be resolved or if it just had to be put into the “bonus tasks” section. 
- Another large challenge that we realised relatively early on was how difficult it is to clone a website using a CSS Framework. It was really difficult to learn how to use a new framework on the job whilst also ensuring it matched in style to the airbnb page. More often than not, we resorted to using CSS instead of the framework or adapting the framework in CSS. This was really tricky to navigate and at times meant we spent longer on the styling than was probably necessary. In hindsight, we probably should have chosen between cloning a website and using a new CSS framework.
- We worked together a lot as a group, whether it be pair or even group programming to find a solution to something a bit more tricky or solving errors - I know that this is a good thing. However, it did cause a lot of problems in terms of merge conflicts and  confusion over who was actually working on what. This is something that we learnt from towards the end of the project and got better at managing, however something I definitely took forward into my next project.

<a name="future-features"></a>
## Future features
- Currently on the sign-up form is only the required fields, as we wanted it to look as simplistic as possible. However we also wanted the user profiles to be fully populated, hence why we seeded some of the users. In future, it would be good to elongate the register form to include the other form fields so that there doesn’t have to be 2 types of user profile pages. 
- One of our initial ideas was to have a “join this experience” button that, if enough users clicked on it (i.e. there was a threshold), a group of users would be formed and they would be able to chat with each other and arrange to go to that experience together. We didn’t quite get round to adding this in but thought it would be a cool feature.
- We also didn’t get round to making the app responsive, which is definitely something that a website like this should be.
- We could have been more particular with the styling if we had more time, especially on the add a new experience page.

<a name="key-learnings"></a>
## Key learnings
- One of the biggest learning curves for me was <strong>learning to read other peoples’ code</strong>. Not only this but also understanding it and building on it to create a wider feature. It opened my eyes to different solutions and ways of approaching obstacles and errors.
- I am really glad I insisted on our <strong>group pseudocoding </strong>from the beginning. As a result, we found it easier to understand other peoples’ code and distinguish between what sections different people were working on, it massively helped with merging conflicts and also helping to establish a neat and tidy “working environment”.
- We had never used git before as a group nor deployed a site to <strong>Heroku</strong> so I am really grateful for those learning opportunities.
- Being placed in a group with people that you have never worked with before (let alone know) was always going to be a challenge. I learnt a lot from being in a team where we had to conduct ourselves with no designated leader. I believe the quiet yet effective approaches I undertook that led to ensuring there were <strong>regular “touch points”</strong> throughout the day where we updated each other on progress, that <strong>managed group dynamics </strong>when it came to communication and also that delicately and sensitively handled different people’s priorities, were met positively and were effective. If I were to be put in this position again, I learnt that setting <strong>clear expectations</strong>and being open with each other at the beginning of the project is key.
