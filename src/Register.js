import React, { useState } from "react";
import { auth } from "./firebase";
import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

function Register({ show }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const registerUser = () => {
    console.log(name);
    setActive(true);
    setEmailErr("");
    setPasswordErr("");

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
            photoURL: profilePic,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name,
                photoUrl: profilePic,
              })
            );
          });
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/email-already-in-use":
            setEmailErr("Email Already in use!");
            break;
          case "auth/weak-password":
            setPasswordErr("Password must be atleast 6 characters long!!!");
            break;
          case "auth/invalid-email":
            setEmailErr("Invalid Email!");
            break;
          case 'auth/network-request-failed':
              alert("Connection Error");
              break;
          default:
            console.error(error);
        }
      })
      .finally(() => setActive(false));
  };
  return (
    <>
      {show && (
        <form>
          <input
            onInput={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
            defaultValue={name}
            name="nameR"
            id="name"
            {...register("nameR", {
              required: {
                value: true,
                message: "Name cannot be empty",
              },
            })}
          />
          {errors?.nameR && (
            <div className="input__error">{errors?.nameR?.message}</div>
          )}
          <input
            placeholder="Profile Pic URL"
            type="text"
            id="profilePic"
            defaultValue={profilePic}
            onInput={(e) => setProfilePic(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="emailR"
            defaultValue={email}
            onInput={(e) => {
              setEmail(e.target.value);
              setEmailErr("");
            }}
            {...register("emailR", {
              required: {
                value: true,
                message: "Email cannot be empty",
              },
            })}
          />
          {(errors?.emailR || emailErr !== "") && (
            <div className="input__error">
              {errors?.emailR?.message || emailErr}
            </div>
          )}
          <div style={{ position: "relative" }}>
            <input
              className="passInput"
              defaultValue={password}
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              onInput={(e) => {
                setPassword(e.target.value);
                setPasswordErr("");
              }}
              name="passwordR"
              {...register("passwordR", {
                required: {
                  value: true,
                  message: "Password cannot be empty",
                },
              })}
            />
            {(errors?.passwordR || passwordErr !== "") && (
              <div className="input__error">
                {errors?.passwordR?.message || passwordErr}
              </div>
            )}
            {passwordVisible ? (
              <VisibilityOffIcon
                onClick={() => setPasswordVisible(false)}
                className="eye__style"
              />
            ) : (
              <VisibilityIcon
                onClick={() => setPasswordVisible(true)}
                className="eye__style"
              />
            )}
          </div>

          {active ? (
            <div className="circular_progress">
              <CircularProgress />
            </div>
          ) : (
            <button type="submit" onClick={handleSubmit(registerUser)}>
              <span>Register</span>
            </button>
          )}
        </form>
      )}
    </>
  );
}

export default Register;
