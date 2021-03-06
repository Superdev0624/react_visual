import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import '../assets/main.css'

export default function Sidebar(props) {
  const [product, setProduct] = useState(false);
  const Username = sessionStorage.getItem('UserName')
  const Roll = sessionStorage.getItem('Role');
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
  }
  const adminShow = () => {
    if (Roll === 'Admin') {
      return (
        <p className="flex item w-full justify-center">Admin</p>
      )
    } else if (Roll === 'Accountant') {
      return (
        <p className="flex item w-full justify-center">Accountant</p>
      )
    } else if (Roll === 'User') {
      return (
        <p className="flex item w-full justify-center">User</p>
      )
    }
  }

  const renderMenuItem = () => {
    if (Roll === 'Admin') {
      return (
        <>
          <Link to="/admindashboard">
            <li className="flex flex-row justify-center h-15 items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white" >
              <span className="uppercase text-xl m-2 font-medium">Dashboard</span>
            </li>
          </Link>
          <li className="flex flex-row items-center h-15 justify-center transform hover:translate-x-2 cursor-pointer transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
            <span className="uppercase ml-1 text-xl m-2 font-medium">Account & Settings</span>
          </li>
          <Link to="/company"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Company</li></Link>
          <Link to="/department"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Departments</li></Link>
          <Link to="/user"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Users</li></Link>
          <Link to="/app"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Apps</li></Link>
          <Link to="/data"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Data</li></Link>
          <Link to="/adminnotification"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Notifications</li></Link>
          <Link to="/billSub"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Billing</li></Link>
        </>
      );
    } else if (Roll === 'Accountant') {
      return (
        <>
          <Link to="/accountantdashboard">
            <li className="flex flex-row justify-center h-15 items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white" >
              <span className="uppercase text-xl m-2 font-medium">Dashboard</span>
            </li>
          </Link>
          <li className="flex flex-row items-center h-15 justify-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
            <span className="uppercase ml-1 text-xl m-2 font-medium" onClick={() => setProduct(!product)}>Accountant</span>
          </li>
          <Link to="/app"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Apps</li></Link>
          <Link to="/data"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-lg hover:bg-green-600 hover:text-white">Data</li></Link>
          <Link to="/adminnotification"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Notifications</li></Link>
          <Link to="/billSub"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">Billing</li></Link>
        </>
      );
    } else if (Roll === 'User') {
      return (
        <>
          <Link to="/userdashboard">
            <li className="flex flex-row justify-center h-15 items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white" >
              <span className="uppercase text-xl m-2 font-medium">Dashboard</span>
            </li>
          </Link>
          <li className="flex flex-row items-center h-15 justify-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
            <span className="uppercase ml-1 text-xl m-2 font-medium" onClick={() => setProduct(!product)}>Settings</span>
          </li>
          <Link to="/profile"><li className="pt-1 pb-1 flex flex-row items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white font-Medium justify-center text-xl hover:bg-green-600 hover:text-white">profile</li></Link>
        </>
      );
    }
  };

  return (
    <div className={"w-full h-full flex justify-between cursor-pointer " + (props.value ? "absolute translate-x-0 " : "hidden absolute translate-x-full")}>
      <div className="inset-0 fixed left-0" onClick={props.sidebarHide} />
      <div className={"w-70 transition transform absolute top-0 bottom-0 right-0 usecolor min-h-full easy-in-out duration-300 " + (props.value ? "absolute z-9999 translate-x-0 " : "absolute translate-x-full")}>

        <div className="flex flex-col column justify-between">
          <div className="px-6 pt-4">
            <div className="px-10 pt-4 flex justify-content center">
              <p className="uppercase flex item text-white italic font-mono w-full justify-center text-3xl font-bold">Hi,{Username} </p>
            </div>
            <div className="px-10 pt-1 flex justify-content center textstylecolor uppercase text-lg font-bold">
              {adminShow()}
            </div>
            <hr className="border-5 mb-2 mt-2"></hr>
            <ul className="f-m-m">
              {renderMenuItem()}
              <Link to="/">
                <li className="flex flex-row justify-center items-center transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:bg-green-600 hover:text-white">
                  <span className="uppercase text-xl m-2 font-medium" onClick={handleLogout}>logout</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}