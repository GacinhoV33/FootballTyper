import './Login.scss';
import React, { useState, useEffect } from 'react'
import Alert from 'react-bootstrap/Alert';
import LoginForm from './LoginForm';
import { UserStatus } from '../../App';

export interface LoginProps {
  setUserStatus: React.Dispatch<React.SetStateAction<UserStatus>>
}

const Login: React.FC<LoginProps> = ({setUserStatus}) => {
  // const apiURL = 'https://football-typer-api.azurewebsites.net/'
  const apiURL = '';
  const [fullName, setFullName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [authMode, setAuthMode] = useState(localStorage.getItem("user") ? "profile" : "signin");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");

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
    e.preventDefault();
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
    if (password != confirmPassword || !re.test(email || "")) {
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

      fetch(apiURL + 'api/TyperUsers/register', requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response); // 2. reject instead of throw
        })
        .then(data => {
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userName, password: password })
          };

          fetch(apiURL + 'api/TyperUsers/authenticate', requestOptions)
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

              fetch(apiURL + `api/TyperUsers/${data.id}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                  localStorage.setItem("user", JSON.stringify(
                    {
                      username: data.username,
                      email: data.email,
                      fullName: data.fullName,
                      id: data.id,
                      imgLink: data.imgLink,
                      leagues: data.leagues
                    }));
                  setAuthMode("profile");
                })
                // .then(() => setUserStatus({userName: userName as unknown as string, isUserSigned: true})
                // );

              setShowAlert(false);
              setIsValid(true);
            });
        })
        .catch((response) => {
          setIsValid(false);
          setShowAlert(true);
          response.json().then((json: any) => {
            setErrorMsg(json.message ? json.message : (json.errors.Username ? json.errors.Username[0] : (json.errors.Password ? json.errors.Password[0] : "")));

          })
        });
    }
    else if (authMode == "signin") {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password: password })
      };

      fetch(apiURL + 'api/TyperUsers/authenticate', requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then(data => {
          localStorage.setItem("userToken", data.token);

          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.token}`
            }
          };

          fetch(apiURL + `api/TyperUsers/${data.id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
              localStorage.setItem("user", JSON.stringify(
                {
                  username: data.username,
                  email: data.email,
                  fullName: data.fullName,
                  id: data.id,
                  imgLink: data.imgLink,
                  leagues: data.leagues
                }));
              setAuthMode("profile");
            })
            // .then(() => setUserStatus({userName: userName as unknown as string, isUserSigned: true}));

          setShowAlert(false);
          setIsValid(true);
        })
        .catch((response) => {
          setShowAlert(true);
          setIsValid(false);
          response.json().then((json: any) => {
            setErrorMsg(json.message ? json.message : (json.errors.Username ? json.errors.Username[0] : (json.errors.Password ? json.errors.Password[0] : "")));
          })
        });
    }
  }

  if (authMode === "signin") {
    return (
      <LoginForm onSubmit={onSubmit} title='Sign In'>
        <div>
          {showAlert
            ? (
              isValid
                ?
                <Alert variant="success">Hurray! We have send your request for registration.</Alert>
                :
                <Alert variant="danger">Oops! Wrong data. <br></br> {errorMsg}</Alert>
            )
            : null
          }
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
              onChange={(e) => handlePasswordInputChange(e)}
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
      </LoginForm>

    )
  }
  else if (authMode === "profile") {
    return (
      <LoginForm onSubmit={onSubmit} title='Profile'>
        <div>
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
      </LoginForm>
    )
  }

  return (
    <LoginForm onSubmit={onSubmit} title='Sign Up'>
      <div>
        {showAlert
          ? (
            isValid
              ?
              <Alert variant="success">Hurray! We have send your request for registration.</Alert>
              :
              <Alert variant="danger">Oops! Correct wrong data. <br></br> {errorMsg}</Alert>
          )
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
    </LoginForm>
  )
}

export default Login