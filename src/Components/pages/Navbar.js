import React from 'react';
import '../assets/main.css';

export default function Navbar(props) {
  
  return (
    <div>
      <nav className="w-full mx-auto bg-white shadow">
        <div className="flex justify-between h-16">
          <div className="h-full flex items-center">
            <div className="ml-5 flex items-center">
              <img
                alt="logo"
                className="object-between w-100 h-6 mt-2 mb-1"
                src="../logo.png"
              />
            </div>
          </div>
          <div className="mr-5 h-full xl:flex items-center justify-end hidden">
            <div className="w-full h-full flex items-center">
              <div className="w-full h-full flex">
                <div className="w-32 h-full flex items-center justify-center cursor-pointer">
                  <span className="relative inline-block mr-3 ">
                    <svg
                      className="h-12 w-15 p-1  mr-3"
                      fill="none"
                      viewBox="0 0 22 22"
                      stroke="currentColor"
                      style={{ color: '#41CCAD' }}
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
                    onClick={props.sidebarShow}
                    aria-label="Main Menu"
                    aria-haspopup="true"
                    className="h-12 w-15 p-1 "
                    viewBox="0 0 22 22"
                    fill="none"
                    stroke="currentColor"
                    style={{ color: '#41CCAD' }}
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
              onClick={props.sidebarShow}
              aria-label="Main Menu"
              aria-haspopup="true"
              className="h-12 w-15 p-1"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              style={{ color: '#41CCAD' }}
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

