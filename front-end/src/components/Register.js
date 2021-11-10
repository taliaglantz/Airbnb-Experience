import React from 'react'

const Register = ({ state, setState }) => {
  const handleClick = () => {
    setState(!state)
  }

  return (
    <div className='popup-screen'>
      <div className='popup-window'>
        <span className="close icon" onClick={handleClick}>
          &times;
        </span>
        <form>
          <h3>Register!</h3>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <br />
          <input type="submit" />
        </form>
      </div>
    </div>
  )

}
export default Register