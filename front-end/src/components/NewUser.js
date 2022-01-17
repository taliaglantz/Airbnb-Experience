import React from 'react'

const NewUser = ({ newUser, createNewUser, setVisibilityLogin }) => {
  const handleClick = (text) => {
    createNewUser(false)
    if (text === 'Log in and explore!') {
      setVisibilityLogin(true)
    }
  }

  return (
    <div className='popup-screen'>
      <div className='popup-window'>
        <i className='close icon' onClick={(event) => handleClick(event.target.innerText)} />
        <div className='popup-header'>
          <h5>Welcome <span className='coral'>{newUser}</span>!</h5>
          <hr />
        </div>
        <div className='popup-form-container'>
          <h4 className='popup-title'>🤍&nbsp;🤍&nbsp;🤍&nbsp;&nbsp;</h4>
          <h4 className='popup-title'>Your account has been successfully created.</h4>
          <button onClick={(event) => handleClick(event.target.innerText)} className='coral-button' type='submit'>Log in and explore!</button>
        </div>
      </div>
    </div>
  )

}
export default NewUser