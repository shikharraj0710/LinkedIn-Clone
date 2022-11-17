import React, { useState } from 'react';
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import HeaderOption from './HeaderOption';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/userSlice';
import { auth } from './firebase';
import { Avatar } from '@mui/material';


export default function Header() {

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [openProfile, setOpenProfile] = useState(false)
  const logoutOfApp = () => {
    dispatch(logout())
    auth.signOut();
  }

  return (
    <div className='header'>
      <div className="header__left">
        <img src="https://th.bing.com/th/id/OIP.aP3LQjrvdagwaLX7wVARlgHaHa?pid=ImgDet&w=512&h=512&rs=1" alt="Icon" />

        <div className='header__search'>
          <SearchIcon />
          <input type="text" placeholder='Search'/>
        </div>

      </div>

      <div className='header__right'>
        <HeaderOption Icon={HomeIcon} title="Home"  />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network"  />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs"  />
        <HeaderOption Icon={ChatIcon} title="Messaging"  />
        <HeaderOption Icon={NotificationsIcon} title="Notifications"  />
        <HeaderOption avatar={true} title="Me" onClick={() => setOpenProfile(prev => !prev)}/>
       {openProfile &&
        <div className="profile__tooltip">
        <div className='profile_tooltip__header'>
        <Avatar src={user?.photoURL}>{user?.displayName[0]}</Avatar>
        <div className='profile_tooltip__right'>
            <div>{user?.displayName}</div>
            <div>{user?.email}</div>
        </div>
        </div>
        <div className="profile__tooltip__logout" onClick={logoutOfApp}>
          Logout
        </div>
        
    </div>}
      </div>
    </div>
 
  )
}
