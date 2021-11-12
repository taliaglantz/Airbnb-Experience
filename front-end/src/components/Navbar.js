import React, { useEffect, useState } from 'react'
import Register from './Register'
import { DateRangePicker } from 'rsuite'
import 'rsuite/dist/rsuite.min.css'


const Navbar = () => {
  const [value, setValue] = useState([])
  const [displayDates, setDisplayDates] = useState([])
  const [visible, setVisibility] = useState(false)
  const [openDatePicker, setDatePicker] = useState(false)
  const [datesClicked, setDatesClicked] = useState(false)

  useEffect(() => {
    if (value.length === 2) {
      const datesToDisplay = value.map(date => {
        return date.split('-').splice(0, 2).join(' ').trim()
      })
      setDisplayDates(datesToDisplay)
    }
  }, [value])

  const datePickerButton = (
    <div onClick={function (event) {
      event.target.addEventListener('click', function () {
        setDatePicker(!openDatePicker)
      }, { once: true })
    }} className='ui item'>
      <div className=' navbar-button card'>
        <div className='navbar-item'>
          <div className='search-data'>
            <p>Nearby</p>
            { displayDates.lenght ? <p>{`${displayDates[0]} - ${displayDates[1]}`}</p> : <p>Select dates</p> }
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
            toggleButton()
          }} className='large-button half location-clicked'>
            <p>
              Nearby
            </p>
          </div>
          <div className='search-icon large-icon'>
            <i className="large search icon" />
            <p>
              Search
            </p>
          </div>
          <div className='large-button half dates'>
            {displayDates.length === 2 ? <p>{`${displayDates[0]} - ${displayDates[1]}`}</p> : <p>Select dates</p>}
          </div>
        </div>
      </div>
    </div>
  )

  const datePicker = (
    <div className='ui item navbar-secondary'>
      <div>
        Experiences
      </div>
      {datePickerButtonLarge}
      <DateRangePicker format={'dd-MMM-yyyy'} toggleAs={'button'} onChange={function () {
        const pickerData = document.querySelector('.rs-picker-toggle-read-only')
        setValue(pickerData.value.split('~'))
      }} onEntering={function () {
        setDatesClicked(true)
        console.log('true')
        toggleButton()
      }} onOk={function () {
        console.log('this')
      }} className='ui item' placeholder=" " style={{ width: 230 }} />
    </div>
  )

  const togglePop = () => {
    setVisibility(!visible)
  }

  const toggleButton = () => {
    const container = document.getElementById('buttons-parent')
    console.log(container)
    if (datesClicked) {
      container.firstChild.classList.add('location-clicked')
      container.firstChild.classList.remove('location')
      container.lastChild.classList.remove('dates-clicked')
      container.lastChild.classList.add('dates')
    } else {
      container.firstChild.classList.remove('location-clicked')
      container.firstChild.classList.add('location')
      container.lastChild.classList.add('dates-clicked')
      container.lastChild.classList.remove('dates')
    }
  }

  return (
    <div className='ui top fixed menu borderless'>
      <div className='ui left item'>
        <img className='ui image small' src='https://res.cloudinary.com/dulbdr0in/image/upload/v1636680281/Assets/logo-experience_jfwyca.gif' />
      </div>
      {openDatePicker ? datePicker : datePickerButton}
      {openDatePicker ?? document.body.addEventListener('click', function () {
        setDatePicker(!openDatePicker)
        console.log(openDatePicker)
      })
      }
      <div className='ui right item dropdown'>
        <div className='navbar-button'>
          <div className='navbar-item'>
            <div className='search-data'>
            </div>
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

