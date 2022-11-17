import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebase";
import Widgets from "./Widgets";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openAlert, setAlertOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
        setOpen(false);
        setAlertOpen(true);
      } else {
        dispatch(logout());
        setOpen(false);
      }
    });
  }, []);

  return (
    <div className="app">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Signed-In as{" "}
              <span style={{ fontWeight: "bolder", margin: "0 5px" }}>
                {user?.email}
              </span>{" "}
              Not you?
              <span
                style={{
                  fontWeight: "bold",
                  textDecoration: "underline",
                  margin: "0 5px",
                  cursor: "pointer",
                  scale: "1.2",
                }}
                onClick={() => {
                  dispatch(logout());
                  auth.signOut();
                }}
              >
                Logout
              </span>
            </Alert>
          </Collapse>
          <div className="app__container">
            <div className="app__body">
              <Sidebar />
              <Feed />
              <Widgets />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
