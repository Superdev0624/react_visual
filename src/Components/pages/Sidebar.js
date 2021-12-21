import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/main.css'

export default function Sidebar(props) {
  const [product, setProduct] = useState(false);
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    toast.info('Log out!')
  }
  const adminShow = () =>{
    if(props.idRoll === 'true') {
      return(
        <>
          <p className="uppercase flex item text-lg w-full justify-center font-bold text-white headcolor">Admin</p>
        </>
      )
    } else if (props.idRoll === 'false') {
      return(
        <>
          <p className="uppercase flex item text-lg w-full justify-center font-bold text-white text-indigo-700">User</p>
        </>
      )
    }
  }

  const renderMenuItem = () => {
    if(props.idRoll === 'true') {
      return (
        <>
          <Link to="/admindashboard">
            <li className="flex flex-row justify-center h-15 items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white" >
              <span className="uppercase text-2xl m-2 font-medium">Dashboard</span>
            </li>
          </Link>
          <li className="flex flex-row items-center h-15 justify-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
            <span className="uppercase ml-1 text-2xl m-2 font-medium" onClick={() => setProduct(!product)}>Account & Settings</span>
          </li>
          {product ? (
            <div>
              <ul>
                <Link to="/company"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Company</li></Link>
                <Link to="/department"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Departments</li></Link>
                <Link to="/user"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Users</li></Link>
                <Link to="/app"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Apps</li></Link>
                <Link to="/billSub"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Billing & Subscription</li></Link>
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
      );
    } else if(props.idRoll === 'false') {
      return (
        <>
          <Link to="">
            <li className="flex flex-row justify-center items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
              <span className="uppercase text-2xl m-2 font-medium">Dashboard</span>
            </li>
          </Link>
          <li className="flex flex-row items-center justify-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
            <span className="uppercase ml-1 text-2xl m-2 font-medium" onClick={() => setProduct(!product)}> Settings </span>
          </li>
          {product ? (
            <div>
              <ul className="my-3">
                <Link to="/profile"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">View Profile</li></Link>
                <Link to="/edit"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Edit Infomation</li></Link>
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
      );
    }
  };

  return (
    <div>              
      <div className={"transition duration-1000 w-full h-full transform " + (props.value ? " absolute z-50 translate-x-0 " : " absolute z-40 -translate-x-full")}>
        <div className="bg-gray-400 opacity-80 inset-0 fixed w-full h-full" onClick={props.sidebarHide}/>
        <div className="w-80 z-20 absolute right-0 z-40 top-0  shadow flex-col usecolor justify-between h-full transition-all duration-300">
          <div className="flex flex-col justify-between h-full">
            <div className="px-6 pt-4">
              <div className="px-10 pt-4 flex justify-content center">
                <p className="uppercase flex item text-white italic font-mono w-full justify-center text-3xl font-bold">Hi,{props.userValue }</p>
              </div>
              <div className="px-10 pt-1 flex justify-content center">
                {adminShow()}
              </div>
              <hr className="border-5 mb-2 mt-2"></hr>
              <ul className="f-m-m">
                {renderMenuItem()}
                <Link to="/">
                  <li className="flex flex-row justify-center items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
                    <span className="uppercase text-2xl m-2 font-medium" onClick={handleLogout}>logout</span>
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}