import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/main.css'

export default function Sidebar(props) {
  const [product, setProduct] = useState(false);
  const Username = sessionStorage.getItem('UserName')
  const Roll = sessionStorage.getItem('Role');
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    toast.info('Log out!')
  }
  const adminShow = () => {
    if (Roll === 'Admin') {
      return (
        <>
          <p className="uppercase flex item text-lg w-full justify-center font-bold text-white headcolor">Admin</p>
        </>
      )
    } else if (Roll === 'Accountant') {
      return (
        <>
          <p className="uppercase flex item text-lg w-full justify-center font-bold text-white text-indigo-700">Accountant</p>
        </>
      )
    } else if (Roll === 'User') {
      return (
        <>
          <p className="uppercase flex item text-lg w-full justify-center font-bold text-white text-indigo-700">User</p>
        </>
      )
    }
  }

  const renderMenuItem = () => {
    if (Roll === 'Admin') {
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
                <Link to="/adminnotification"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Notifications</li></Link>
                <Link to="/billSub"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Billing</li></Link>
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
      );
    } else if (Roll === 'Accountant') {
      return (
        <>
          <Link to="/accountantdashboard">
            <li className="flex flex-row justify-center h-15 items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white" >
              <span className="uppercase text-2xl m-2 font-medium">Dashboard</span>
            </li>
          </Link>
          <li className="flex flex-row items-center h-15 justify-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
            <span className="uppercase ml-1 text-2xl m-2 font-medium" onClick={() => setProduct(!product)}>Accountant</span>
          </li>
          {product ? (
            <div>
              <ul>
                <Link to="/app"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Apps</li></Link>
                <Link to="/adminnotification"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Notifications</li></Link>
                <Link to="/billSub"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Billing</li></Link>
              </ul>
            </div>
          ) : (
            ""
          )}
        </>
      );
    } else if (Roll === 'User') {
      return (
        <>
          <Link to="/userdashboard">
            <li className="flex flex-row justify-center h-15 items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white" >
              <span className="uppercase text-2xl m-2 font-medium">Dashboard</span>
            </li>
          </Link>
          <li className="flex flex-row items-center h-15 justify-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
            <span className="uppercase ml-1 text-2xl m-2 font-medium" onClick={() => setProduct(!product)}>Settings</span>
          </li>
          {product ? (
            <div>
              <ul>
                <Link to="/profile"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">profile</li></Link>
                <Link to="/edit"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">edit account</li></Link>
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
    <div className={"transition duration-1000 w-full h-full transform " + (props.value ? " absolute z-50 translate-x-0 " : " absolute z-40 -translate-x-full")}>
      <div className="bg-gray-300 opacity-80 inset-0 fixed w-full h-full" onClick={props.sidebarHide} />
      <div className="w-80 z-20 absolute right-0 z-40 top-0  shadow flex-col usecolor justify-between h-full transition-all duration-300">
        <div className="flex flex-col justify-between h-full">
          <div className="px-6 pt-4">
            <div className="px-10 pt-4 flex justify-content center">
              <p className="uppercase flex item text-white italic font-mono w-full justify-center text-3xl font-bold">Hi,{Username} </p>
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
  )
}