import { randomInt } from 'crypto';
import React, { useState } from 'react'
import './Login.scss';

const Login = () => {
  // const passwordRef = useRef<HTMLInputElement | null>(null)
  // const emailRef = useRef<HTMLInputElement | null>(null)

  const [fullName, setFullName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  let [authMode, setAuthMode] = useState("profile") //useState("signin")

  const handleFullNameInputChange = (e: any) => {
    const { id, value } = e.target;
    setFullName(value);
  }

  const handleUserNameInputChange = (e: any) => {
    const { id, value } = e.target;
    setUserName(value);
  }

  const handleEmailInputChange = (e: any) => {
    const { id, value } = e.target;
    setEmail(value);
  }

  const handlePasswordInputChange = (e: any) => {
    const { id, value } = e.target;
    if (confirmPassword != null && password != confirmPassword) {
      // alert("pibib");
    }
    setPassword(value);
  }

  const handleConfirmPasswordInputChange = (e: any) => {
    const { id, value } = e.target;
    if (password != confirmPassword) {
      // alert("pibib");
    }
    setConfirmPassword(value);
  }

  const handleLogOut = (e: any) => {
    localStorage.setItem("user", "");
    localStorage.setItem("userToken", "");
    setAuthMode("signin");
  }

  function onSubmit(e: React.FormEvent) {
    console.log("onSubmit <------------------------------->");
    console.log(authMode);
    e.preventDefault();
    if (authMode == "signup") {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName, username: userName, password: password, email: email })
      };
      fetch('api/TyperUsers/register', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
      // .then(data => this.setState({ postId: data.id }));
    }
    else if (authMode == "signin") {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: "mav", password: "sercret-password" })
      };
      fetch('api/TyperUsers/authenticate', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          localStorage.setItem("userToken", data.token);

          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            },
            // body: JSON.stringify({ username: "mav", password: "sercret-password" })
          };

          fetch(`api/TyperUsers/${data.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
              console.log(data);
              localStorage.setItem("user", JSON.stringify(data));
              setAuthMode("profile");
            });
        });
    }
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={onSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>User Name</label>
              <input
                id="userName"
                type="text"
                className="form-control mt-1"
                placeholder="e.g userName1"
                onChange={(e) => handleUserNameInputChange(e)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Sign In
              </button>
            </div>
            {/* <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    )
  }
  else if (authMode === "profile") {
    return (
      <div className="Auth-form-container">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Profile</h3>
          <div className="text-center">
            You are logged in
          </div>
          <div className="form-group mt-3">
            <label>Full Name: {(JSON.parse(localStorage.getItem("user") as string)).fullName} </label>
          </div>
          <div className="form-group mt-3">
            <label>User Name: {(JSON.parse(localStorage.getItem("user") as string)).userName} </label>
          </div>
          <div className="form-group mt-3">
            <label>Email address: {(JSON.parse(localStorage.getItem("user") as string)).email} </label>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button className="btn btn-primary" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={onSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              id="fullName"
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              onChange={(e) => handleFullNameInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              id="userName"
              type="text"
              className="form-control mt-1"
              placeholder="e.g userName1"
              onChange={(e) => handleUserNameInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              id="email"
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(e) => handleEmailInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => handlePasswordInputChange(e)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm password</label>
            <input
              id="confirmPassword"
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => handleConfirmPasswordInputChange(e)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Create account
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  )
}

export default Login