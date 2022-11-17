import "./Login.scss";
import React, { useState, useEffect, useRef, useContext } from "react";
import Alert from "react-bootstrap/Alert";
import LoginForm from "./LoginForm";
import UploadProfilePicture from "../ProfilePicture/UploadProfilePicture";
import { UserContext, UserStatus } from "../../App";
import GoogleLoginButton from './GoogleLoginButton'
import FacebookLogin from "./FacebookLogin";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export interface LoginProps {
  setUserStatus: React.Dispatch<React.SetStateAction<UserStatus>>;
}

const Login: React.FC<LoginProps> = ({ setUserStatus }) => {
  const [fullName, setFullName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const [authMode, setAuthMode] = useState(
    localStorage.getItem("user") ? "profile" : "signin"
  );
  const [isValid, setIsValid] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fullNameModal, setFullNameModal] = useState<string>('');
  const API_URL = process.env.REACT_APP_IS_IT_PRODUCTION_VERSION === 'true' ? process.env.REACT_APP_API_URL_PROD : process.env.REACT_APP_API_URL_LOCAL;
  const modalRef = useRef<HTMLInputElement | null>(null);
  const userCtx = useContext(UserContext);


  const sendHttpRequest = async (path: string, requestOptions: any) => {
    await fetch(API_URL + path, requestOptions).then((response) => {
      if (response.ok) {
        return response.json();
      }
    });
  };

  function handleCloseModal() {
    setShowModal(false);
  }

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  async function handleSubmitModal() {
    if (modalRef.current !== null && modalRef.current !== undefined) {
      setFullNameModal(modalRef.current.value);
      const putRequestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          username: userCtx.userLocalData.username,
          fullName: fullNameModal,
        }),
      };
      await sendHttpRequest(
        API_URL + `api/TyperUsers/FullName/${userCtx.userLocalData.id}`,
        putRequestOptions
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: userCtx.userLocalData.username,
          email: userCtx.userLocalData.email,
          fullName: fullNameModal,
          id: userCtx.userLocalData.id,
          imgLink: userCtx.userLocalData.imgLink,
          leagues: userCtx.userLocalData.leagues,
        })
      );
    }
    else {
      setFullNameModal(fullName);
    }
    console.log(fullNameModal);

    setShowModal(false);
  }

  useEffect(() => {
    const msg =
      password !== confirmPassword && confirmPassword !== null
        ? "Passwords are not the same."
        : "";
    setPasswordErrorMessage(msg);
  }, [confirmPassword, password]);

  const handleFullNameInputChange = (e: any) => {
    setFullName(e.target.value);
  };

  const handleUserNameInputChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handleEmailInputChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordInputChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleLogOut = (e: any) => {
    e.preventDefault();
    localStorage.setItem("user", "");
    localStorage.setItem("userToken", "");
    localStorage.setItem("tokenExpirationDate", "");

    const userStatus: UserStatus = {
      userLocalData: {
        username: "",
        email: "",
        fullname: "",
        id: 0,
      },
      isUserSigned: false,
    };
    setUserStatus(userStatus);
    setAuthMode("signin");
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const isDataValid = () => {
    setShowAlert(true);
    var re = /\S+@\S+\.\S+/;
    if (password !== confirmPassword || !re.test(email || "")) {
      setIsValid(false);
      return false;
    } else if (userName.length > 15) {
      setIsValid(false);
      setErrorMsg("Username is too long");
      return false;
    }
    setIsValid(true);
    return true;
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (authMode === "signup" && !isDataValid()) {
      return;
    }

    if (authMode === "signup") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName,
          username: userName,
          password: password,
          email: email,
        }),
      };

      fetch(
        API_URL + "api/TyperUsers/register",
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: userName, password: password }),
          };

          fetch(
            API_URL + "api/TyperUsers/authenticate",
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("userToken", data.token);

              const requestOptions = {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${data.token}`,
                },
              };

              fetch(
                API_URL + `api/TyperUsers/${data.id}`,
                requestOptions
              )
                .then((response) => response.json())
                .then((data) => {
                  localStorage.setItem(
                    "user",
                    JSON.stringify({
                      username: data.username,
                      email: data.email,
                      fullName: data.fullName,
                      id: data.id,
                      imgLink: data.imgLink,
                      leagues: data.leagues,
                    })
                  );
                  setAuthMode("profile");
                });

              const userStatus: UserStatus = {
                userLocalData: {
                  username: "",
                  email: "",
                  fullname: "",
                  id: 0,
                },
                isUserSigned: true,
              };
              setUserStatus(userStatus);
              setShowAlert(false);
              setIsValid(true);
            });

        })
        .catch((response) => {
          setIsValid(false);
          setShowAlert(true);
          response.json().then((json: any) => {
            setErrorMsg(
              json.message
                ? json.message
                : json.errors.Username
                  ? json.errors.Username[0]
                  : json.errors.Password
                    ? json.errors.Password[0]
                    : json.errors.FullName
                      ? json.errors.FullName[0]
                      : ""
            );
          });
        });
    } else if (authMode === "signin") {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password: password }),
      };

      fetch(
        API_URL + "api/TyperUsers/authenticate",
        requestOptions
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        })
        .then((data) => {
          localStorage.setItem("userToken", data.token);

          const requestOptions = {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.token}`,
            },
          };

          fetch(
            API_URL + `api/TyperUsers/${data.id}`,
            requestOptions
          )
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem(
                "user",
                JSON.stringify({
                  username: data.username,
                  email: data.email,
                  fullName: data.fullName,
                  id: data.id,
                  imgLink: data.imgLink,
                  leagues: data.leagues,
                })
              );
              setAuthMode("profile");
            });

          const userStatus: UserStatus = {
            userLocalData: {
              username: "",
              email: "",
              fullname: "",
              id: 0,
            },
            isUserSigned: true,
          };
          setUserStatus(userStatus);
          setShowAlert(false);
          setIsValid(true);
        })
        .catch((response) => {
          setShowAlert(true);
          setIsValid(false);
          response.json().then((json: any) => {
            setErrorMsg(
              json.message
                ? json.message
                : json.errors.Username
                  ? json.errors.Username[0]
                  : json.errors.Password
                    ? json.errors.Password[0]
                    : ""
            );
          });
        });
    }
  }

  if (authMode === "signin") {
    return (
      <LoginForm onSubmit={onSubmit} title="Sign In">
        <div>
          {showAlert ? (
            isValid ? (
              <Alert variant="success">
                Hurray! We have send your request for registration.
              </Alert>
            ) : (
              <Alert variant="danger">
                Oops! Wrong data. <br></br> {errorMsg}
              </Alert>
            )
          ) : null}
          <div className="text-center">
            Not registered yet?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign Up
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', margin: '2vh 0' }}>
            <GoogleLoginButton setAuthMode={setAuthMode} />
          </div>
          {/* <FacebookLogin /> */}
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
    );
  } else if (authMode === "profile") {
    const localData = JSON.parse(localStorage.getItem("user") as string);
    return (
      <LoginForm onSubmit={onSubmit} title="Profile">
        <div>
          <div className="form-group mt-3 text-center">
            <div className="text-center">You are logged in as</div>
            <label style={{ fontSize: '4vh' }}>{localData?.fullName} </label>
          </div>
          <div className="text-center">
            <Button
              style={{ height: '4vh' }}
              onClick={() => setShowModal(true)}
            >
              Change display name
            </Button>
          </div>
          <UploadProfilePicture></UploadProfilePicture>
          <div className="d-grid gap-2 mt-3">
            <Button className="btn btn-primary" onClick={async () => handleLogOut}>
              Log out
            </Button>
          </div>
          {showModal ?
            <Modal show={showModal} onHide={handleCloseModal} centered >
              <Modal.Title className="modal-header" id='modal-fullname'>
                Enter new display name
              </Modal.Title>
              <Modal.Body>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '5%' }}>
                  <input placeholder={'New name...'} value={fullNameModal}
                    ref={modalRef}
                    onChange={(e) =>
                      setFullNameModal(e.target.value)
                    } />
                  <Button
                    onClick={handleSubmitModal}
                  >
                    Submit
                  </Button>
                </div>

              </Modal.Body>
            </Modal>
            : null}
        </div>
      </LoginForm>
    );
  }

  return (
    <LoginForm onSubmit={onSubmit} title="Sign Up">
      <div>
        {showAlert ? (
          isValid ? (
            <Alert variant="success">
              Hurray! We have send your request for registration.
            </Alert>
          ) : (
            <Alert variant="danger">
              Oops! Correct wrong data. <br></br> {errorMsg}
            </Alert>
          )
        ) : null}
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
  );
};

export default Login;
