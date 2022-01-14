import React from 'react'
import '../../Components/assets/main.css'
export default function Application() {
  function submitbutton1 (e) {
    e.preventDefault();
    console.log(e);
  }
  function submitbutton2 (e) {
    e.preventDefault();
    console.log(e);
  }
  function submitbutton3 (e) {
    e.preventDefault();
    console.log(e);
  }
  return (
    // <div className="flex min-h-screen justify-center items-center">
    <div className="flex justify-evenly h-screen items-center">
      <button onclick={submitbutton1} className="cursor-pointer">
        <img
          alt="logo"
          className="object-between h-50 mb-10"
          src="../xero.png"
        />
        <p className="text-center font-medium text-xl text-gray-400 textstylecolor uppercase">XERO</p>
      </button>
      <button onclick={submitbutton2} className="cursor-pointer">
        <img
          alt="logo"
          className="object-between h-50 mb-10"
          src="../Qb.png"
        />
        <p className="text-center font-medium text-xl text-gray-400 textstylecolor uppercase">Quickbookonline</p>
      </button>
      <button onclick={submitbutton3} className="cursor-pointer">
        <img
          alt="logo"
          className="object-between h-50 mb-10"
          src="../Excel.png"
        />
        <p className="text-center font-medium text-xl text-gray-400 textstylecolor uppercase">Excel</p>
      </button>
    </div>
    // </div>
  )
}