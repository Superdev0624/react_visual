import React from 'react'
import '../../Components/assets/main.css'
export default function Application() {
  var clientId ="ABrOwTX3hXgkfMSGc90PAahKuDw890Vpq5XN2Bg3DBdzldY6wL"
  var clientSecret = "s0qRV2M5hVriUhlTIzye4XwPElkSvnAGVXyhXw0J"
  // var callbackurl = "https://wepull.herokuapp.com"
  var url =`https://appcenter.intuit.com/connect/oauth2/${clientId}/${clientSecret}/https://451d-188-43-136-33.ngrok.io/callback`;
  return (
    <div className="flex flex-col column justify-arround p-10">
      <div className="text-5xl font-bold text-center textstylecolor ">Accounting provider setup</div>
      <div className="text-3xl font-Medium text-center mt-10 mb-10 font-mono text-gray-400">Please select your data source</div>
      <div className="flex justify-around items-center">
        <button className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl ">
          <img className="object-between pl-5 pr-5 mb-5" src="../xero.png" alt="XERO" />
          <p className="text-center font-medium text-2xl text-gray-400 textstylecolor uppercase">XERO</p>
        </button>
        <a href={url} className="block p-6 max-w-xs bg-white rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <img className="object-between " src="../Qb.png" alt="quickbook" />
          <p className="text-center font-medium text-lg mt-5 textstylecolor ">QuickBooks Online</p>
        </a>
        <button className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <img className="object-between pl-5 pr-5 mb-5" src="../Excel.png" alt="excel" />
          <p className="text-center font-medium text-2xl text-gray-400 textstylecolor uppercase">Trial Balance import</p>
        </button>
      </div>
    </div>   
  )
}
