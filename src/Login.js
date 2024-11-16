import React, { useState } from 'react'
import './Login.css'
import Register from './Register'
import SignIn from './SignIn'
import LinkedInLogo from './images/linkedin.png'

function Login () {
  const [signinShow, setSigninShow] = useState(true)
  const [registerShow, setRegisterShow] = useState(false)

  const handleSignInClick = () => {
    setRegisterShow(false)
    setSigninShow(true)
  }

  const handleRegisterClick = () => {
    setRegisterShow(true)
    setSigninShow(false)
  }

  return (
    <div className='login'>
      <img src={LinkedInLogo} alt='LinkedIn' />
      <div className='login__options'>
        <div
          onClick={handleSignInClick}
          style={{ background: signinShow ? '#0074b1' : 'initial' }}
        >
          SignIn
        </div>
        <div
          onClick={handleRegisterClick}
          style={{ background: registerShow ? '#0074b1' : 'initial' }}
        >
          Register
        </div>
      </div>

      <SignIn show={signinShow} />
      <Register show={registerShow} />
    </div>
  )
}

export default Login
