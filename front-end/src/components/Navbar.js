import React, { useState } from 'react'
import Register from './Register'

const Navbar = () => {
  const [visible, setVisibility] = useState(false)

  const togglePop = () => {
    setVisibility(!visible)
  }

  return (
    <div className='ui top fixed menu'>
      <div className="btn" onClick={togglePop}>
        <button>New User?</button>
      </div>
      {visible ? <Register className='ui modal' state={visible} setState={setVisibility} /> : null}
    </div>
  )
}
export default Navbar