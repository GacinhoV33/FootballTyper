import './Login.scss';
import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';

const Login = () => {

  const [fullName, setFullName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  let [authMode, setAuthMode] = useState("signin");

  const [isValid, setIsValid] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  useEffect(() => {
    const msg = password != confirmPassword && confirmPassword != null ? "Passwords are not the same." : "";
    setPasswordErrorMessage(msg);
  }, [confirmPassword, password]
  )

  const handleFullNameInputChange = (e: any) => {
    setFullName(e.target.value);
  }

  const handleUserNameInputChange = (e: any) => {
    setUserName(e.target.value);
  }

  const handleEmailInputChange = (e: any) => {
    setEmail(e.target.value);
  }

  const handlePasswordInputChange = (e: any) => {
    setPassword(e.target.value);
  }

  const handleConfirmPasswordInputChange = (e: any) => {
    setConfirmPassword(e.target.value);
  }

  const handleLogOut = (e: any) => {
    localStorage.setItem("user", "");
    localStorage.setItem("userToken", "");
    setAuthMode("signin");
  }

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  }

  const isDataValid = () => {
    setShowAlert(true);
    var re = /\S+@\S+\.\S+/;
    if (password != confirmPassword || re.test(email || "")) {
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (authMode === "signup" && !isDataValid()) {
      return;
    }

    if (authMode == "signup") {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: fullName, username: userName, password: password, email: email })
      };

      fetch('api/TyperUsers/register', requestOptions)
        .then(response => response.json())
        .then(data => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userName, password: password })
          };

          fetch('api/TyperUsers/authenticate', requestOptions)
            .then(response => response.json())
            .then(data => {
              localStorage.setItem("userToken", data.token);

              const requestOptions = {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${data.token}`
                }
              };

              fetch(`api/TyperUsers/${data.id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                  localStorage.setItem("user", JSON.stringify(data));
                  setAuthMode("profile");
                });
            });
        })
    }
    else if (authMode == "signin") {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password: password })
      };

      fetch('api/TyperUsers/authenticate', requestOptions)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("userToken", data.token);

          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            }
          };

          fetch(`api/TyperUsers/${data.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
              localStorage.setItem("user", JSON.stringify(data));
              setAuthMode("profile");
            });
        });
    }
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
              <label>Username or email</label>
              <input
                id="userNameOrEmail"
                type="text"
                className="form-control mt-1"
                placeholder="e.g userName1 or user@mail.com"
                onChange={(e) => handleUserNameInputChange(e)}
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
            <label>User Name: {(JSON.parse(localStorage.getItem("user") as string)).username} </label>
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
          {showAlert
            ? (isValid ? <Alert variant="success">Hurray! We have send your request for registration.</Alert> : <Alert variant="danger">Oops! Correct wrong data.</Alert>)
            : null
          }
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
            <p className="invalid-password-msg">{passwordErrorMessage}</p>
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
            <p className="invalid-password-msg">{passwordErrorMessage}</p>
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