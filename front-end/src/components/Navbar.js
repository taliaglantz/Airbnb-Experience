import React, { useEffect, useState } from 'react'
import Register from './Register'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { getPayLoad } from './Helpers/auth'


const Navbar = () => {
  const [visible, setVisibility] = useState(false)
  const [openDatePicker, setDatePicker] = useState(false)
  const [datesClicked, setDatesClicked] = useState(false)
  const [displayDates, setDisplayDates] = useState('Select dates')
  const [startDate, setStartDate] = useState('Start date')
  const [endDate, setEndDate] = useState('end date')
  const [newRange, setNewRange] = useState(true)

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {

  }, [location.pathname])

  useEffect(() => {
    let datesToDisplay
    if (startDate === endDate) {
      datesToDisplay = `${startDate}`
    } else {
      datesToDisplay = `${startDate} - ${endDate}`
    }
    setDisplayDates(datesToDisplay)
  }, [startDate, endDate])

  useEffect(() => {
    if (openDatePicker) {
      toggleButton()
    }
  }, [datesClicked])

  const datePickerButton = (
    <div onClick={function (event) {
      event.target.addEventListener('click', function () {
        setDatePicker(!openDatePicker)
      }, { once: true })
    }} className='ui item navbar-center'>
      <div className=' navbar-button'>
        <div className='navbar-item'>
          <div className='search-data'>
            <p>Nearby</p>
            { displayDates !== 'Start date - end date' ? <p>{displayDates}</p> : <p>Select dates</p>}
          </div>
          <div className='search-icon'>
            <i className="search icon" />
          </div>
        </div>
      </div>
    </div>
  )

  const datePickerButtonLarge = (
    <div className='navbar-extended'>
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
          <div className='search-icon large-icon' onClick={function () {
            setDatePicker(!openDatePicker)
            setDatesClicked(false)
          }}>
            <i className="large search icon" />
            <p>
              Search
            </p>
          </div>
          <div className='large-button half dates'>
            <p className='search-header'>Date</p>
            {<p>{displayDates}</p>}
          </div>
        </div>
      </div>
    </div>
  )

  const datePicker = (
    <div className='ui item navbar-secondary'>
      <div className='navbar-link'>
        Experiences
      </div>
      {datePickerButtonLarge}
      <DateRangePicker format={'dd-MMM-yyyy'} toggleAs={'button'}
        onSelect={function (date) {
          console.log(newRange)
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

  const togglePop = () => {
    setVisibility(!visible)
  }

  const toggleButton = () => {
    console.log(datesClicked)
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

  // Sorry Anna
  const userIsAuthenticated = () => {
    const payload = getPayLoad()
    if (!payload) return false
    const now = Math.round(Date.now() / 1000)
    return now < payload.exp
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    history.push('/')
  }

  return (
    <div className='ui top fixed menu borderless'>
      {/* Im so sorry Anna, we are adding in this button to link to register */}
      {!userIsAuthenticated() ?
        <>
          <Link to='/register'>
            <button>Register</button>
          </Link>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </>
        :
        <button onClick={handleLogout}>Log out</button>
      }
      {userIsAuthenticated() &&
        <Link to="/experiences/new">
          <button>
            Add a new experience
          </button>
        </Link>
      }
      {/* -------- */}
      <div className='ui left item'>
        <img className='ui image small' src='https://res.cloudinary.com/dulbdr0in/image/upload/v1636747530/logo-experience-new_zrfthh.png' />
      </div>
      {openDatePicker ? datePicker : datePickerButton}
      {openDatePicker ?? document.body.addEventListener('click', function () {
        setDatePicker(!openDatePicker)
      })
      }
      <div className='ui right item dropdown'>
        <div className='navbar-button'>
          <div className='navbar-item'>
            <i className='bars icon' />
            <div className='user-icon'>
              <svg viewBox="0 0 32 32" fill='grey'><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
            </div>
          </div>
          <div className='dropdown-content'>
            <div className='dropdown-item'>Login</div>
            <div onClick={togglePop} className='dropdown-item'>Sign up</div>
            <hr />
            <div className='dropdown-item'>Edit profile</div>
          </div>
        </div>
      </div>
      {visible ? <Register className='ui modal' state={visible} setState={setVisibility} /> : null}
    </div>
  )
}
export default Navbar

