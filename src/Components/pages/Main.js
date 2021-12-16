import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Main() {
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    navigate('/')
    toast.warning('Log out!')
}
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem('Auth Token')
    if (authToken) {
        navigate('/pages/main')
        toast.success('Authentication Success!')
    }

    if (!authToken) {
        navigate('/home')
    }
}, [])
    return (
      <div>
        <ToastContainer />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>Log out</button>
      </div>
    )
}
