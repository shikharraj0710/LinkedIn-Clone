import React, { useState } from "react";
import "./Login.css";
import Register from "./Register";
import SignIn from "./SignIn";

function Login() {

  const [signinShow, setSigninShow] = useState(true);
  const [registerShow, setRegisterShow] = useState(false);

  const handleSignInClick = () => {
    setRegisterShow(false)
    setSigninShow(true)
  }

  const handleRegisterClick = () => {
    setRegisterShow(true)
    setSigninShow(false)
  }

  return (
    <div className="login">

      <img
        src="https://th.bing.com/th/id/R.1e905ce98876c9742e892bbb029f5a4f?rik=3LMZyFzgHKPMIQ&riu=http%3a%2f%2fblog.doteasy.com%2fwp-content%2fuploads%2f2013%2f12%2flinkedin-logo.png&ehk=uMGZ6PcFMad7tG1wxs6hRZN7RUwbi9h2RoI0x2rYUDQ%3d&risl=&pid=ImgRaw&r=0"
        alt="LinkedIn"
      />

      <div className="login__options">
        <div onClick={handleSignInClick} style={{background: signinShow ? "#0074b1" : "initial"}}>SignIn</div>
        <div onClick={handleRegisterClick} style={{background: registerShow ? "#0074b1" : "initial"}}>Register</div>
      </div>

      
      <SignIn show={signinShow} />
      <Register show={registerShow} />

    </div>
  );
}

export default Login;
