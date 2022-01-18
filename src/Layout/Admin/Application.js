import React from 'react'
import '../../Components/assets/main.css'
export default function Application() {
  return (
    <div className="flex flex-col column justify-between p-10">
      <div className="text-5xl font-bold text-center textstylecolor ">Accounting provider setup</div>
      <div className="text-3xl font-Medium text-center mt-10 mb-10 font-mono text-gray-400">Please select your data source</div>
      <div className="flex justify-around items-center">
        <a href="https://login.xero.com/identity/user/login" className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl ">
          <img className="object-between h-50 pl-5 pr-5 mb-5" src="../xero.png" alt="XERO" />
          <p className="text-center font-medium text-2xl text-gray-400 textstylecolor uppercase">XERO</p>
        </a>
        <a href="https://accounts.intuit.com/index.html" className="block p-6 max-w-sm bg-white rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <img className="object-between h-50 pl-5 pr-5 mb-5" src="../Qb.png" alt="quickbook" />
          <p className="text-center font-medium text-2xl text-gray-400 textstylecolor uppercase">quickbooks online</p>
        </a>
        <a href="https://accounts.intuit.com/index.html" className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <img className="object-between h-50 pl-5 pr-5 mb-5" src="../Excel.png" alt="excel" />
          <p className="text-center font-medium text-2xl text-gray-400 textstylecolor uppercase">Trial Balance import</p>
        </a>
      </div>
    </div>
      
  )
}