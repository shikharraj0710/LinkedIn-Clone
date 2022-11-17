import React, { useState } from "react";
import { auth } from "./firebase";
import { login } from "./features/userSlice";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";

function SignIn({ show }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const loginToApp = () => {
    setActive(true);
    setEmailErr("");
    setPasswordErr("");
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            photoUrl: userAuth.user.photoURL,
          })
        );
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/wrong-password":
            setPasswordErr("Wrong Password!");
            break;
          case "auth/invalid-email":
            setEmailErr("Invalid Email!");
            break;
          case 'auth/network-request-failed':
            alert("Connection Error");
            break;
          case 'auth/user-not-found':
            setEmailErr("Email not registered!");
            break;
          default: console.error(error)
        }
      })
      .finally(() => setActive(false));
  };
  return (
    <>
      {show && (
        <form>
          <input
            type="email"
            placeholder="Email"
            defaultValue={email}
            onInput={(e) => setEmail(e.target.value)}
            name="email"
            {...register("email", {
              required: { value: true, message: "Email cannot be Empty" },
            })}
          />
          {(errors?.email || emailErr !== "") && (
            <div className="input__error">
              {errors?.email?.message || emailErr}
            </div>
          )}
          <div style={{ position: "relative" }}>
            <input
              className="passInput"
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              onInput={(e) => setPassword(e.target.value)}
              name="password"
              defaultValue={password}
              {...register("password", {
                required: {
                  value: true,
                  message: "Password cannot be Empty",
                },
              })}
            />
            {(errors?.password || passwordErr !== "") && (
              <div className="input__error">
                {errors?.password?.message || passwordErr}
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
            <button type="submit" onClick={handleSubmit(loginToApp)}>
              <span>Sign In</span>
            </button>
          )}
        </form>
      )}
    </>
  );
}

export default SignIn;
