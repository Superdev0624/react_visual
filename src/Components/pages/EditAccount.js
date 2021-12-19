import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/main.css'
export default function EditAccount() {
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState(false);
  let Username = sessionStorage.getItem('UserName');
  const handleLogout = () => {
    sessionStorage.removeItem('Auth Token');
    toast.info('Log out!')
  }
  return (
    <div className="absolute bg-green-200 w-full h-full">
      <div className={show ? "w-full h-full absolute z-50  transform  translate-x-0 " : "   w-full h-full absolute z-40  transform -translate-x-full"}>
        <div className="bg-gray-800 opacity-80 inset-0 fixed w-full h-full" onClick={() => setShow(!show)} />
        <div className="w-80 z-20 absolute right-0 z-40 top-0  shadow flex-col usecolor transform top-0 right-0 w-64 fixed h-full overflow ease-in-out transition-all z-30">
          <div className="flex flex-col justify-between h-full">
            <div className="px-6 pt-4">
              <div className="px-10 pt-4 flex justify-content center">
                  <p className="flex item text-white w-full text-2xl pb-2 font-bold">Hi,{Username}</p>
              </div>
              <div className="px-10 pt-1 flex justify-content center">
                  <p className="flex item text-sl w-full ">User</p>
              </div>
              <hr className="border-5 mb-5 mt-5"></hr>
              <ul className="f-m-m">
                <Link to='/user'>
                  <li className="text-gray-800 pt-3">
                    <div className="flex items-center">
                      <p className="text-white ml-3 text-2xl hover:text-indigo-700" >Dashboard</p>
                    </div>
                  </li>
                </Link>
                  <li >
                    <div>
                        <p className="text-white ml-3 text-2xl mt-2 hover:text-indigo-700" onClick={() => setProduct(!product)}>Settings</p>
                    </div>
                    {product ? (
                      <div>
                        <ul className="my-3">
                          <Link to="/profile"><li className="text-white font-Medium font-mono ml-6 mt-3 text-lg hover:text-indigo-700">View Profile</li></Link>
                          <Link to="/editaccount"><li className="text-white font-Medium font-mono ml-6 mt-3 text-lg hover:text-indigo-700">Edit Account</li></Link>
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                  <a href="/">
                    <li className="text-gray-800 pt-3">
                      <div className="flex items-center">
                        <p className="text-white ml-3 text-2xl hover:text-indigo-700" onClick={handleLogout}>Log out</p>
                      </div>
                    </li>
                  </a>
              </ul>
            </div>
            <div className="w-full">
              <div className="border-t border-gray-300">
                <div className="w-full flex items-center justify-between px-6 pt-1">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="w-full mx-auto bg-white shadow">
        <div className="container justify-between h-16 flex items-center lg:items-stretch mx-auto">
          <div className="h-full flex items-center">
            <div className="mr-10 flex items-center">
              <img
                alt="logo"
                className="object-between w-100 mt-2 h-6"
                src="../logo.png"
              />
            </div>
          </div>
          <div className="h-full xl:flex items-center justify-end hidden">
            <div className="w-full h-full flex items-center">
              <div className="w-full h-full flex">
                <div className="w-32 h-full flex items-center justify-center cursor-pointer">
                  <span className="relative inline-block">
                    <svg 
                        className="h-12 w-15 p-1  mr-3" 
                        fill="none" 
                        viewBox="0 0 22 22" 
                        stroke="currentColor"
                        style={{color:'#41CCAD'}}
                      >
                        <path 
                          strokeLinecap="round"
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                        />
                      </svg>
                      <span 
                        className="absolute top-4 right-7 inline-flex items-center justify-center px-1 py-1 text-xs font-light leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                      >
                        99
                      </span>
                  </span>
                  <svg
                    onClick={() => setShow(!show)}
                    aria-label="Main Menu" 
                    aria-haspopup="true"
                    className="h-12 w-15 p-1 "
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="currentColor"
                    style={{color:'#41CCAD'}}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="3" 
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>   
                </div>
              </div>
            </div>
          </div>
          <div className="visible xl:hidden flex items-center relative">
            <svg
              onClick={() => setShow(!show)}
              aria-label="Main Menu" 
              aria-haspopup="true"
              className="h-12 w-15 p-1"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              style={{color:'#41CCAD'}}
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="3" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
      </nav>
    </div>
  )
}
