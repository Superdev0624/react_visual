import React from 'react'
import '../../Components/assets/main.css'
export default function AccountantDashboard() {
  const companyname = sessionStorage.getItem('conditionusers')
  return(
    <div className="min-w-screen min-h-screen flex justify-center px-5 py-5">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-6">
        <div className="text-5xl leading-5 text-gray-500 text-center font-bold uppercase mb-5">company:{ companyname }</div>
        <h1 className="headcolor text-6xl italic fot-bold">Account Graphic visual</h1>
      </div>
    </div>
  )
}