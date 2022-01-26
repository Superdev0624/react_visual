import React from 'react'
import axios from 'axios'
import {useLocation} from "react-router-dom";
import '../../Components/assets/main.css'
export default function Application() {
  // const clientId = 'ABrOwTX3hXgkfMSGc90PAahKuDw890Vpq5XN2Bg3DBdzldY6wL';
  // const clientSecret = 'mYerpvoNJSTUWmfmEtkqa14qXH0pIN4dcxSrBaaF';
  // const authorization_code = (clientId + ":" + clientSecret)
  // const Authorization = "Basic " + Buffer.from(authorization_code).toString('base64');
  // const headers = {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'Authorization': Authorization
  // }
  function qbointegration (event) {
    axios.get('https://wepull-back.herokuapp.com/authUri')
    .then(res=>{
      window.location.href = res.data;
    })
  }

  const search = useLocation().search;
  // const authcode = new URLSearchParams(search).get('code')
  const realmId = new URLSearchParams(search).get('realmId')
  React.useEffect(() => {
    // if (!authcode) return;
    // const data = {
    //   'grant_type': 'authorization_code',
    //   'code': authcode,
    //   'redirect_uri': 'https://d1f3-188-43-136-33.ngrok.io/app',
    //   url: search
    // }
    axios.get('https://wepull-back.herokuapp.com/callback' + search)
      .then((response) => {
        axios.get('https://wepull-back.herokuapp.com/getCompanyInfo')
        .then(ref=>{
          console.log('companyinfo',ref.data)
        })
        axios.post('https://sandbox-quickbooks.api.intuit.com/v3/company/' + realmId)
        .then(res=>{
          console.log('vendorinfo', res.data)
        })
      })
    // eslint-disable-next-line
  }, []);

 return (
    <div className="flex flex-col column justify-arround p-10">
      <div className="text-5xl font-bold text-center textstylecolor mt-10 mb-10 font-mono uppercase">Data Source</div>
      <div className="flex justify-around items-center">
        <button className="block p-6 w-1/4 h-40 bg-white rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <div className="flex justify-center items-center">
            <img className="object-between h-20 w-20" src="../xero.png" alt="XERO" />
          </div>
          <p className="text-center font-medium text-lg mt-5 textstylecolor">XERO</p>
        </button>
        <button className="block p-6 w-1/4 h-40 bg-white rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl" onClick={qbointegration}>
          <div className="flex justify-center items-center">
            <img className="object-between" src="../Qb.png" alt="Qb" />
          </div>
          <p className="text-center font-medium text-lg mt-10 textstylecolor ">QuickBooks Online</p>
        </button>
      </div>
      <div className="flex justify-around items-center mt-5 ">
        <button className="block p-6 w-1/4 h-8 flex justify-center items-center backcustomcolor rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
          <p className="text-center font-medium text-lg text-white">Disconnect XERO</p>
        </button>
        <button className="block p-6 w-1/4 h-8 flex justify-center items-center backcustomcolor rounded-lg border-2 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl">
         <p className="text-center font-medium text-lg text-white">Disconnect Quickbooks</p>
        </button>
      </div>
    </div>   
    
  )
}
