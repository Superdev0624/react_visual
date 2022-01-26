import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/main.css'
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';
export default function Layout(props) {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const authToken = sessionStorage.getItem('Auth Token')
  const logmsg = sessionStorage.getItem('loginSuccessMsg')
  const authID = sessionStorage.getItem('UID')
  useEffect(() => {
    if (logmsg === 'false'){
      sessionStorage.setItem('loginSuccessMsg', 'true');
    } 
    if (!authToken) {
      navigate('/')
    }
  // eslint-disable-next-line
  }, [])
  const handleShow = (e) => {
    e.preventDefault();
    setShow(true);
  };
  const handleHide = (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
   <div >
    <ToastContainer />
    <Navbar 
      sidebarShow={handleShow}
      userID = {authID}

    />
    <Sidebar 
      sidebarHide={handleHide} 
      value={show}
    />
    <div>
      {props.child}
    </div>
   </div>
  )
}
