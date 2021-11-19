import React from 'react'

const SeeYou = ({ username, setUsername, setVisibilitySeeYou }) => {
  const handleClick = () => {
    setUsername(false)
    setVisibilitySeeYou(false)
    window.location.reload()
  }

  return (
    <div className='popup-screen'>
      <div className='popup-window'>
        <i className='close icon' onClick={handleClick} />
        <div className='popup-header'>
          <h5>See you soon <span className='coral'>{username}</span>!</h5>
          <hr />
        </div>
        <div className='popup-form-container'>
          <h4 className=''>🤍&nbsp;🤍&nbsp;🤍&nbsp;&nbsp;</h4>
          <h4 className=''>We are sad to see you go!</h4>
          <button onClick={handleClick} className='coral-button' type='submit'>Bye bye..</button>
        </div>
      </div>
    </div>
  )

}
export default SeeYou