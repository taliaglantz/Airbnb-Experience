import React, { useEffect, useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import NewUser from './NewUser'
import SeeYou from './SeeYou'
import { DateRangePicker, RangeSlider } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { getPayLoad } from './Helpers/auth'

const Navbar = () => {
  const history = useHistory()
  const location = useLocation()
  const [price, setPrice] = useState([25, 250])
  const [visibleRegister, setVisibilityRegister] = useState(false)
  const [visibleSeeYou, setVisibilitySeeYou] = useState(false)
  const [visibleLogin, setVisibilityLogin] = useState(false)
  const [username, setUsername] = useState(false)
  const [newUser, createNewUser] = useState(false)
  const [openDatePicker, setDatePicker] = useState(false)
  const [openFilters, setOpenFilters] = useState(false)
  const [datesClicked, setDatesClicked] = useState(false)
  const [displayDates, setDisplayDates] = useState('Select dates')
  const [startDate, setStartDate] = useState('Start date')
  const [endDate, setEndDate] = useState('end date')
  const [newRange, setNewRange] = useState(true)
  let categoryString = ''
  let categories = new Array


  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname === '/experiences') {
      setOpenFilters(true)
    } else {
      setOpenFilters(false)
      setDatePicker(false)
    }
  }, [location.pathname])

  // Toggle navbar background transparency
  window.addEventListener('scroll', function () {
    const navbarElements = document.querySelectorAll('.toggle-background')
    const scrollYPosition = window.scrollY
    let breakPoint
    if (window.location.pathname === '/') {
      breakPoint = 525
    } else {
      breakPoint = 0
    }
    if (scrollYPosition >= breakPoint) {
      navbarElements.forEach(element => {
        element.classList.add('white')
      })
    } else {
      navbarElements.forEach(element => {
        element.classList.remove('white')
      })
    }
  })

  // Updating dates to display on buttons
  useEffect(() => {
    let datesToDisplay
    if (startDate === endDate) {
      datesToDisplay = `${startDate}`
    } else {
      datesToDisplay = `${startDate} - ${endDate}`
    }
    setDisplayDates(datesToDisplay)
  }, [startDate, endDate])

  // Changing focus on selected button
  useEffect(() => {
    if (openDatePicker) {
      toggleButton()
    }
  }, [datesClicked])

  // Small button - opens date picker large button
  const datePickerButton = (
    <div onClick={function (event) {
      event.target.addEventListener('click', function () {
        setDatePicker(!openDatePicker)
        setOpenFilters(false)
      }, { once: true })
    }} className='ui item navbar-center'>
      <div className=' navbar-button'>
        <div className='navbar-item'>
          <div className='search-data'>
            <p>Nearby</p>
            {displayDates !== 'Start date - end date' ? <p>{displayDates}</p> : <p>Select dates</p>}
          </div>
          <div className='search-icon'>
            <i className='search icon' />
          </div>
        </div>
      </div>
    </div>
  )

  // Large button - opens date picker calendar
  const datePickerButtonLarge = (
    <div className='navbar-extended toggle-background'>
      <div className='navbar-button large-button'>
        <div className='navbar-item' id='buttons-parent'>
          <div onClick={function () {
            setDatesClicked(false)
          }} className='large-button half location-clicked'>
            <p className='search-header'>Location</p>
            <p>
              London - Nearby
            </p>
          </div>
          <Link to={{
            pathname: '/experiences',
            search: `cat=${categoryString}&from=${startDate}&to=${endDate}`
          }} className='search-icon large-icon' onClick={function () {
            setDatePicker(!openDatePicker)
            setOpenFilters(true)
            setDatesClicked(false)
            // add dates filter
            // redirect to different page
          }}>
            <i className='large search icon' />
            <p>
              Search
            </p>

          </Link>
          <div className='large-button half dates'>
            <p className='search-header'>Date</p>
            {<p>{displayDates}</p>}
          </div>
        </div>
      </div>
    </div >
  )

  // Date picker calendar component -> rsuite module
  const datePicker = (
    <div className='ui item navbar-secondary'>
      <div className='navbar-link'>
        Experiences
      </div>
      {datePickerButtonLarge}
      <DateRangePicker format={'dd-MMM-yyyy'} toggleAs={'button'}
        onSelect={function (date) {
          const options = { year: 'numeric', month: 'short', day: 'numeric' }
          if (newRange) {
            setStartDate(date.toLocaleDateString(undefined, options))
            setNewRange(false)
          } else {
            setEndDate(date.toLocaleDateString(undefined, options))
            setNewRange(true)
          }
        }} onEnter={function () {
          setDatesClicked(true)
        }} />
    </div>
  )
  // ! Filters 

  const setFilter = () => {
    console.log(location)
    history.push({
      pathname: '/experiences',
      search: `cat=${categoryString}&from=${startDate}&to=${endDate}&pricemin=${price[0]}&pricemax=${price[1]}`
    })
  }

  const priceFilter = (
    <div className='ui item dropdown'>
      <div>
        <div className='filter-button '>
          <p>Price</p>
          <i className='angle down icon' />
        </div>
        <div className='dropdown-content-filters'>
          <div className='dropdown-filters'>
            <p>The average price of an experience is £73</p>
            <RangeSlider
              max={250}
              defaultValue={[25, 250]}
              style={{ marginTop: 16 }}
              value={price}
              onChange={value => {
                setPrice(value)
              }}
            />
            <div className='price-input-container'>
              <div className='ui input price-input'>
                <div className='input-label'>
                  <p>min price</p>
                  <p>£</p>
                </div>
                <input
                  min={0}
                  max={250}
                  value={price[0]}
                  onChange={event => {
                    const newPrice = [event.target.value, price[1]]
                    if (event.target.value > price[1]) {
                      return
                    }
                    setPrice(newPrice)
                  }}
                />
              </div>
              <p>-</p>
              <div className='ui input price-input'>
                <div className='input-label'>
                  <p>max price</p>
                  <p>£</p>
                </div>
                <input
                  min={0}
                  max={250}
                  value={price[1]}
                  onChange={event => {
                    const newPrice = [price[0], event.target.value]
                    if (price[0] > event.target.value) {
                      return
                    }
                    setPrice(newPrice)
                  }}
                />
              </div>
            </div>
            <div>
              <hr />
            </div>
            <button className='ui secondary button price-search' onClick={setFilter}>Search</button>
          </div>
        </div>
      </div>

    </div>
  )

  const ratingFilter = (
    <div className='ui item dropdown'>
      <div>
        <div className='filter-button '>
          <p>Rating</p>
          <i className='angle down icon' />
        </div>
        <div className='dropdown-content-filters'>
          <div className='dropdown-item'>Rating content</div>
        </div>
      </div>
    </div>
  )

  const languageFilter = (
    <div className='ui item dropdown'>
      <div className='divider'>
        <div className='filter-button '>
          <p>Language offered</p>
          <i className='angle down icon' />
        </div>
        <div className='dropdown-content-filters'>
          <div className='dropdown-item'>Language content</div>
        </div>
      </div>
    </div>
  )

  const categoryFilters = (
    <div className='category-filters'>

      <div className='ui item dropdown'>
        <div className='filter-button' onClick={(event) => setCategory(event.target)}>
          Sports
        </div>
      </div>

      <div className='ui item dropdown'>
        <div className='filter-button' onClick={(event) => setCategory(event.target)}>
          Entertainment
        </div>
      </div>

      <div className='ui item dropdown'>
        <div className='filter-button' onClick={(event) => setCategory(event.target)}>
          Art and culture
        </div>
      </div>

      <div className='ui item dropdown'>
        <div className='filter-button' onClick={(event) => setCategory(event.target)}>
          Food and drink
        </div>
      </div>

      <div className='ui item dropdown'>
        <div className='filter-button' onClick={(event) => setCategory(event.target)}>
          Nature and outdoors
        </div>
      </div>

      <div className='ui item dropdown'>
        <div className='filter-button' onClick={(event) => setCategory(event.target)}>
          Sight seeing
        </div>
      </div>

    </div>
  )

  const filtersAll = (
    <div className='ui item dropdown'>
      <div className='filter-button' >
        <p>Filters</p>
        <i className='sliders horizontal icon'></i>
      </div>
    </div>
  )

  // ! Filter bar
  const filtersBar = (
    <div className='navbar-extended filters-bar '>
      <div className='filters-left'>
        {priceFilter}
        {ratingFilter}
        {languageFilter}
        {categoryFilters}
      </div>
      {filtersAll}
    </div>
  )

  const togglePop = (action) => {
    if (action === 'Sign up') {
      setVisibilityRegister(!visibleRegister)
    }
    if (action === 'Log in') {
      setVisibilityLogin(!visibleLogin)
    }
  }

  const toggleButton = () => {
    const container = document.getElementById('buttons-parent')
    if (datesClicked) {
      container.firstChild.classList.remove('location-clicked')
      container.firstChild.classList.add('location')
      container.lastChild.classList.add('dates-clicked')
      container.lastChild.classList.remove('dates')
    }
    if (!datesClicked) {
      container.firstChild.classList.add('location-clicked')
      container.firstChild.classList.remove('location')
      container.lastChild.classList.remove('dates-clicked')
      container.lastChild.classList.add('dates')
    }
  }

  const redirect = (url) => {
    history.push(url)
    window.scrollTo(0, 0)
  }

  const setCategory = (button) => {
    const selected = button.innerText
    button.classList.toggle('active')
    if (button.classList.contains('active')) {
      categories.push(selected)
    } else {
      categories = categories.filter(item => item !== selected)
    }
    if (categories.length) {
      categoryString = categories.join('_')
    } else {
      categoryString = ''
    }
    console.log(location)
    history.push({
      pathname: '/experiences',
      search: `cat=${categoryString}&from=${startDate}&to=${endDate}&pricemin=${price[0]}&pricemax=${price[1]}`
    })
  }

  // !!!!!!!!!!!!!!!!!!!

  const userIsAuthenticated = () => {
    const payload = getPayLoad()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    setVisibilitySeeYou(true)
  }

  const publicMenu = (
    <>
      <div onClick={(event) => {
        togglePop(event.target.innerText)
      }} className='dropdown-item'>Log in</div>
      <div onClick={(event) => {
        togglePop(event.target.innerText)
      }} className='dropdown-item'>Sign up</div>
    </>
  )

  const userMenu = (
    <>
      <div className='dropdown-item' onClick={() => {
        redirect('/experiences/experience/new')
      }} >
        Add a new experience
      </div>
      <div className='dropdown-item'>Edit profile</div>
      <hr />
      <div className='dropdown-item' onClick={handleLogout}>Log out</div>
    </>
  )

  return (
    <div className='ui top fixed menu borderless toggle-background'>
      <div onClick={() => {
        redirect('/')
      }} className='ui left item'>
        <img className='ui image small' src='https://res.cloudinary.com/dulbdr0in/image/upload/v1636747530/logo-experience-new_zrfthh.png' />
      </div>
      {openDatePicker ? datePicker : datePickerButton}
      {openDatePicker ?? document.body.addEventListener('click', function () {
        setDatePicker(!openDatePicker)
      })
      }
      {openFilters ? filtersBar : <></>}
      <div className='ui right item dropdown'>
        <div className='navbar-button'>
          <div className='navbar-item'>
            <i className='bars icon' />
            <div className='user-icon'>
              <svg viewBox='0 0 32 32' fill='grey'><path d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'></path></svg>
            </div>
            {username ? <p className='user-message'>Welcome back <span className='coral'>{username}</span>!</p> : null}
          </div>
          <div className='dropdown-content'>

            {!userIsAuthenticated() ? publicMenu : userMenu}

          </div>
        </div>
      </div>
      {visibleRegister ? <Register className='ui modal' state={visibleRegister} setState={setVisibilityRegister} createNewUser={createNewUser} /> : null}
      {visibleLogin ? <Login className='ui modal' setUsername={setUsername} state={visibleLogin} setState={setVisibilityLogin} /> : null}
      {newUser ? <NewUser className='ui modal' newUser={newUser} createNewUser={createNewUser} setVisibilityLogin={setVisibilityLogin} /> : null}
      {visibleSeeYou ? <SeeYou className='ui modal' username={username} setUsername={setUsername} setVisibilitySeeYou={setVisibilitySeeYou} /> : null}
    </div>
  )
}
export default Navbar



