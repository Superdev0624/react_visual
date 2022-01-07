import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/main.css'
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';
export default function Layout(props) {
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const Username = sessionStorage.getItem('UserName')
  const authToken = sessionStorage.getItem('Auth Token')
  const logmsg = sessionStorage.getItem('loginSuccessMsg')
  useEffect(() => {
    if (logmsg === 'false'){
      toast.success("Welcome login in " + Username +" website successfully");
      sessionStorage.setItem('loginSuccessMsg', 'true');
    } 
    if (!authToken) {
      navigate('/')
    }
  }, [])
  const handleShow = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const handleHide = (e) => {
    e.preventDefault();
    setShow(false);
  };
  return (
   <div>
    <ToastContainer />
    <Navbar 
      sidebarShow={handleShow}

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
