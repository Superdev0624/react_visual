import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/main.css'
import Sidebar from './pages/Sidebar';
import Navbar from './pages/Navbar';
export default function Layout() {
  let navigate = useNavigate();
  const Username = sessionStorage.getItem('UserName')
  const Roll = sessionStorage.getItem('Roll');
  const [show, setShow] = useState(false);
  useEffect(() => {
    const authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
      toast.success('Welcome ' + Username + ' to WEPULL!')
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
      idRoll={Roll} 
      userValue={Username} 
      value={show}
    />
   </div>
  )
}
