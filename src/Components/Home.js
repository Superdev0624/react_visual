import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
      <div>
        <nav className="flex items-center justify-between flex-wrap p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
              <img
                alt="logo"
                className="object-between w-100 h-6"
                src="../logo.png"
              />
          </div>
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <div>
              <Link 
                className="text-blue-700 border-blue-700 hover:bg-blue-700 hover:text-white font-medium text-xl py-3 px-5 border-double border-4 hover:border-white mr-5"
                to="/auth/login"
              >
                LOGIN
              </Link>
            </div>
          </div>
        </nav>         
      </div>
    )
}
